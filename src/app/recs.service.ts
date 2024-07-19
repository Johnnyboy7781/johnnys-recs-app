import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Region, Subregion } from './data-types';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RecsService {

  backendUrl = environment.backendUrl;

  #http = inject(HttpClient);

  getRegions(): Observable<Region[]> {
    return this.#http.get<Region[]>(`${this.backendUrl}/regions`);
  }

  getSubregionsByRegion(id: number): Observable<Subregion[]> {
    return this.#http.get<Subregion[]>(`${this.backendUrl}/subregions/region/${id}`);
  }

}
