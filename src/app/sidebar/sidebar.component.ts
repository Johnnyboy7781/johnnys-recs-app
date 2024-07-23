import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog'
import { ListInfoDialog } from './list-info-dialog/list-info-dialog.component';
import { RecsService } from '../recs.service';
import { Region, Subregion } from '../data-types';
import { tap } from 'rxjs';
import { FilerStore } from '../filters.store';
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideIn', [
        transition('* => *', [
            query(':enter', [
              style({ opacity: 0, transform: 'translateX(-15px)' }),
              stagger(100, [
                animate('250ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
              ])
            ], { optional: true })
          ]
        )
      ]
    )
  ]
})
export class SidebarComponent implements OnInit {

  regions!: Region[];
  subregions: Subregion[] | undefined;

  #dialog = inject(MatDialog);
  #recsService = inject(RecsService);
  filtersStore = inject(FilerStore);

  ngOnInit(): void {
      this.#recsService.getRegions()
        .pipe(
          tap((regions) => this.regions = regions)
        ).subscribe();
  }

  openInfoDialog(): void {
    this.#dialog.open(ListInfoDialog, { autoFocus: false });
  }

  onRegionSelectionChange(event: MatSelectChange): void {
    this.filtersStore.updateState({ 
      region: event.value,
      subregion: -1
    });

    this.#recsService.getSubregionsByRegion(event.value)
      .pipe(
        tap((subregions) => this.subregions = subregions)
      ).subscribe();
  }

}
