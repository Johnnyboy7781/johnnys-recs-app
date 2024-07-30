import { Component, effect, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { ListInfoDialog } from './list-info-dialog/list-info-dialog.component';
import { CUSTOM_BREAKPOINTS, RecsService } from '../recs.service';
import { FilterStore } from '../filters.store';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDividerModule,
    MatIconModule,
    MatSlideToggleModule,
    CommonModule
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
  recsService = inject(RecsService);
  filterStore = inject(FilterStore);
  listStore = inject(ListStore);
  CUSTOM_BREAKPOINTS = CUSTOM_BREAKPOINTS;

  constructor() {
    // Load list data whenever filters change
    effect(() => {
      this.recsService.loadListData(getState(this.filterStore));
    }, { allowSignalWrites: true });
  }

  ngOnInit(): void {
    this.recsService.getRegions();
  }

  openInfoDialog(): void {
    this.#dialog.open(ListInfoDialog, { autoFocus: false });
  }

  handleClear(): void {
    this.filterStore.resetSubFilters();
    if (this.recsService.screenSize() === CUSTOM_BREAKPOINTS.SMALL) {
      this.recsService.toggleSidenav();
    }
  }
  
}
