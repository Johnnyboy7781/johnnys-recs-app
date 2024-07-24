import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Region, Subregion, Place } from './data-types';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';
import { FilterStoreState } from './filters.store';

@Injectable({ providedIn: 'root' })
export class RecsService {

  backendUrl = environment.backendUrl;
  listData = signal<Place[]>([]);
  subregions = signal<Subregion[]>([]);
  regions = signal<Region[]>([]);

  #http = inject(HttpClient);

  getRegions(): void {
    this.#http.get<Region[]>(`${this.backendUrl}/regions`)
      .pipe(
        tap((data) => this.regions.set(data))
      ).subscribe();
  }

  getSubregionsByRegion(id: number): void {
    this.#http.get<Subregion[]>(`${this.backendUrl}/subregions/region/${id}`)
      .pipe(
        tap((data) => this.subregions.set(data))
      ).subscribe();
  }

  loadListData(params: FilterStoreState): void {
    if (params.region === -1) {
      return;
    }

    const queryString = new HttpParams()
      .append("region_id", params.region)
      .append("subregion_id", params.subregion)
      .append("num_stars", params.numStars)
      .append("has_superlative", params.hasSuperlative);

    this.#http.get<Place[]>(`${this.backendUrl}/places?${queryString}`).pipe(
      tap(data => this.listData.set(data)),
      tap(data => console.log(data))
    ).subscribe();
  }
}
