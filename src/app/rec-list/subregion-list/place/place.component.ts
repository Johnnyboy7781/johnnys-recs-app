import { Component, inject, input, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Place, PlaceInfo } from '../../../data-types';
import { RecsService } from '../../../recs.service';
import { tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-place',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './place.component.html',
  styleUrl: './place.component.scss'
})
export class PlaceComponent {

  place = input.required<Place>();
  placeInfo = signal<PlaceInfo | null>(null);

  #recsService = inject(RecsService);

  loadPlaceInfo(google_uid: string): void {
    if (this.placeInfo() !== null) {
      return;
    }

    this.#recsService.loadPlaceInfo(google_uid)
      .pipe(
        tap(data => this.placeInfo.set(data))
      ).subscribe()
  }

  openLink(url: string) {
    window.open(url, "_blank");
  }

}
