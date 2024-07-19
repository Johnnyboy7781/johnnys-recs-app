import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Region } from './data-types';
import { environment } from '../environments/environment';
import { map, Observable, pipe } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecsService {
  backendUrl = environment.backendUrl;

  #http = inject(HttpClient);

  getRegions(): Observable<Region[]> {
    return this.#http.get<Region[]>(`${this.backendUrl}/regions`);
  }

}
