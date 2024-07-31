import { Component, inject, OnDestroy, OnInit, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RecListComponent } from "./rec-list/rec-list.component";
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subject, takeUntil, tap } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { FilterStore } from './filters.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListStore } from './list.store';
import { CUSTOM_BREAKPOINTS, RecsService } from './recs.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    SidebarComponent, 
    RecListComponent, 
    MatSidenavModule, 
    MatIconModule, 
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('fade', [
      transition('void => active', [
        style({ opacity: 0 }),
        animate(150, style({ opacity: 1 }))
      ]),
      transition('* => void', [
        animate(150, style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AppComponent implements OnInit, OnDestroy {

  sidenav = viewChild.required<MatSidenav>('sidenav');
  destroyed = new Subject<void>();
  CUSTOM_BREAKPOINTS = CUSTOM_BREAKPOINTS;

  #breakpointObserver = inject(BreakpointObserver);
  filterStore = inject(FilterStore);
  listStore = inject(ListStore);
  recsService = inject(RecsService);

  constructor() {
    // Listen for screen width changes
    this.#breakpointObserver.observe([
      CUSTOM_BREAKPOINTS.LARGE,
      CUSTOM_BREAKPOINTS.SMALL
    ])
    .pipe(takeUntil(this.destroyed))
    .subscribe((result) => {
      for(const query of Object.keys(result.breakpoints)) {
        if (result.breakpoints[query]) {
          this.recsService.screenSize.set(query as CUSTOM_BREAKPOINTS);
        }
      }
    });
  }

  ngOnInit(): void {
    this.recsService.sidenavSubject.pipe(
      tap(() => this.sidenav().toggle())
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  toggleMenu(): void {
    this.sidenav().toggle();
  }

}
