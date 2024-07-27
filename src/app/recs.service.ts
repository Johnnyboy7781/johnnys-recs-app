import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Region, Subregion, Place, PlaceInfo } from './data-types';
import { environment } from '../environments/environment';
import { Observable, tap } from 'rxjs';
import { FilterStoreState } from './filters.store';
import { ListStore } from './list.store';

@Injectable({ providedIn: 'root' })
export class RecsService {

  backendUrl = environment.backendUrl;
  #isLoadingSubregions = signal<boolean>(false);
  isloadingPlaces = signal<boolean>(false);

  #http = inject(HttpClient);
  #listStore = inject(ListStore);

  getRegions(): void {
    this.#http.get<Region[]>(`${this.backendUrl}/regions`)
      .pipe(
        tap((data) => this.#listStore.updateRegions(data))
      ).subscribe();
  }

  getSubregionsByRegion(id: number): void {
    this.#isLoadingSubregions.set(true);
    this.#http.get<Subregion[]>(`${this.backendUrl}/subregions/region/${id}`)
      .pipe(
        tap((data) => this.#listStore.updateSubregions(data))
      ).subscribe({
        complete: () => {
          this.#isLoadingSubregions.set(false)
        }
      });
  }

  async loadListData(params: FilterStoreState): Promise<void> {
    if (params.region === -1) {
      return;
    }

    this.isloadingPlaces.set(true);

    await new Promise((resolve) => this.waitForSubregions(resolve));

    const queryString = new HttpParams()
      .append("region_id", params.region)
      .append("subregion_id", params.subregion)
      .append("num_stars", params.numStars)
      .append("has_superlative", params.hasSuperlative);

    this.#http.get<Place[]>(`${this.backendUrl}/places?${queryString}`).pipe(
      tap(data => this.#listStore.updatePlaces(data)),
    ).subscribe({
      complete: () => {
        this.isloadingPlaces.set(false);
      }
    });
  }

  async waitForSubregions(resolve: Function): Promise<void> {
    if (!this.#isLoadingSubregions()) {
      resolve();
    } else {
      setTimeout(() => this.waitForSubregions(resolve), 100)
    }
  }

  loadPlaceInfo(google_uid: string): Observable<PlaceInfo> {
    return this.#http.get<PlaceInfo>(`${this.backendUrl}/places/${google_uid}`);
  }
}
