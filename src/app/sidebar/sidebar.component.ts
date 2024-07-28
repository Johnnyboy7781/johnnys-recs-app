import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ListInfoDialog } from './list-info-dialog/list-info-dialog.component';
import { RecsService } from '../recs.service';
import { FilterStore } from '../filters.store';
import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { getState } from '@ngrx/signals';
import { ListStore } from '../list.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slideIn', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateX(-15px)' }),
            stagger(100, [
              animate(
                '250ms ease-out',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class SidebarComponent implements OnInit {

  hasEffectFiredOnce = false;

  #dialog = inject(MatDialog);
  #recsService = inject(RecsService);
  filterStore = inject(FilterStore);
  listStore = inject(ListStore);

  constructor() {
    effect(() => {
      this.#recsService.loadListData(getState(this.filterStore));
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.#recsService.getRegions();
  }

  openInfoDialog(): void {
    this.#dialog.open(ListInfoDialog, { autoFocus: false });
  }

  onRegionSelectionChange(event: MatSelectChange): void {
    this.filterStore.updateState({ region: event.value });
    this.filterStore.resetSubFilters();

    this.#recsService.getSubregionsByRegion(event.value);
  }
  
}
