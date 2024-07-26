import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Region, Subregion, Place } from './data-types';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';
import { FilterStoreState } from './filters.store';
import { ListStore } from './list.store';

@Injectable({ providedIn: 'root' })
export class RecsService {

  backendUrl = environment.backendUrl;
  #loadingSubregions = signal<boolean>(false);

  #http = inject(HttpClient);
  #listStore = inject(ListStore);

  getRegions(): void {
    this.#http.get<Region[]>(`${this.backendUrl}/regions`)
      .pipe(
        tap((data) => this.#listStore.updateRegions(data))
      ).subscribe();
  }

  getSubregionsByRegion(id: number): void {
    this.#loadingSubregions.set(true);
    this.#http.get<Subregion[]>(`${this.backendUrl}/subregions/region/${id}`)
      .pipe(
        tap((data) => this.#listStore.updateSubregions(data))
      ).subscribe({
        complete: () => {
          this.#loadingSubregions.set(false)
        }
      });
  }

  async loadListData(params: FilterStoreState): Promise<void> {
    await new Promise((resolve) => this.waitForSubregions(resolve));

    if (params.region === -1) {
      return;
    }

    const queryString = new HttpParams()
      .append("region_id", params.region)
      .append("subregion_id", params.subregion)
      .append("num_stars", params.numStars)
      .append("has_superlative", params.hasSuperlative);

    this.#http.get<Place[]>(`${this.backendUrl}/places?${queryString}`).pipe(
      tap(data => this.#listStore.updatePlaces(data)),
    ).subscribe();
  }

  async waitForSubregions(resolve: Function): Promise<void> {
    if (!this.#loadingSubregions()) {
      resolve();
    } else {
      setTimeout(() => this.waitForSubregions(resolve), 100)
    }
  }
}
