import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Region, Subregion, Place, PlaceInfo } from './data-types';
import { environment } from '../environments/environment';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { FilterStore, FilterStoreState } from './filters.store';
import { ListStore } from './list.store';
import { MatSelectChange } from '@angular/material/select';
import { getState } from '@ngrx/signals';

@Injectable({ providedIn: 'root' })
export class RecsService {
    backendUrl = environment.backendUrl;
    #isLoadingSubregions = signal<boolean>(false);
    isloadingPlaces = signal<boolean>(false);
    screenSize = signal<CUSTOM_BREAKPOINTS | null>(null);
    sidenavSubject = new ReplaySubject<void>();

    #http = inject(HttpClient);
    #listStore = inject(ListStore);
    #filterStore = inject(FilterStore);

    /**
     * Get all regions
     */
    getRegions(): void {
        this.#http
            .get<Region[]>(`${this.backendUrl}/regions`)
            .pipe(tap((data) => this.#listStore.updateRegions(data)))
            .subscribe();
    }

    /**
     * On region selection, resets sub filters and fetches all subregions for the selected region
     *
     * @param event The selection event
     */
    onRegionSelectionChange(event: MatSelectChange): void {
        this.#filterStore.updateState({ region: event.value });
        this.#filterStore.resetSubFilters();

        this.getSubregionsByRegion(event.value);

        this.loadListData(getState(this.#filterStore));
    }

    /**
     * Get all subregions for a given region ID
     *
     * @param id The region ID to search with
     */
    getSubregionsByRegion(id: number): void {
        this.#isLoadingSubregions.set(true);
        this.#http
            .get<Subregion[]>(`${this.backendUrl}/subregions/region/${id}`)
            .pipe(tap((data) => this.#listStore.updateSubregions(data)))
            .subscribe({
                complete: () => {
                    this.#isLoadingSubregions.set(false);
                }
            });
    }

    /**
     * Get all places filtered via query parameters
     *
     * @param params The data to build the filter query parameters from
     */
    async loadListData(params: FilterStoreState): Promise<void> {
        if (params.region === -1) {
            return;
        }

        this.isloadingPlaces.set(true);

        // Places load depends on subregion data, wait for subregions to finish loading
        await new Promise((resolve) => this.waitForSubregions(resolve));

        const queryString = new HttpParams()
            .append('region_id', params.region)
            .append('subregion_id', params.subregion)
            .append('num_stars', params.numStars)
            .append('has_superlative', params.hasSuperlative);

        this.#http
            .get<Place[]>(`${this.backendUrl}/places?${queryString}`)
            .pipe(tap((data) => this.#listStore.updatePlaces(data)))
            .subscribe({
                complete: () => {
                    this.isloadingPlaces.set(false);
                }
            });
    }

    /**
     * Resolves when subregions are done loading
     *
     * @param resolve A promise resolve function
     */
    async waitForSubregions(resolve: Function): Promise<void> {
        if (!this.#isLoadingSubregions()) {
            resolve();
        } else {
            setTimeout(() => this.waitForSubregions(resolve), 100);
        }
    }

    /**
     * Gets place details from Google Places API
     *
     * @param google_uid The Google UID to search with
     * @returns An observable with the place detail data
     */
    loadPlaceInfo(google_uid: string): Observable<PlaceInfo> {
        return this.#http.get<PlaceInfo>(
            `${this.backendUrl}/places/${google_uid}`
        );
    }

    toggleSidenav(): void {
        this.sidenavSubject.next();
    }
}

export enum CUSTOM_BREAKPOINTS {
    LARGE = '(min-width: 700px)',
    SMALL = '(max-width: 699px)'
}
