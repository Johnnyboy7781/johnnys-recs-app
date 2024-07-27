import { Component, inject, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Place } from '../../data-types';
import { MatIconModule } from '@angular/material/icon';
import { RecsService } from '../../recs.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-subregion-list',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './subregion-list.component.html',
  styleUrl: './subregion-list.component.scss'
})
export class SubregionListComponent {

  subregionName = input.required<string>();
  places = input.required<Place[]>();

  #recsService = inject(RecsService);

  loadPlaceInfo(google_uid: string): void {
    this.#recsService.loadPlaceInfo(google_uid)
      .pipe(
        tap(data => console.log(data))
      ).subscribe()
  }
}
