import { Component, inject, OnDestroy, OnInit, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RecListComponent } from "./rec-list/rec-list.component";
import { MatDrawerMode, MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { animate, style, transition, trigger } from '@angular/animations';
import { FilterStore } from './filters.store';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ListStore } from './list.store';
import { RecsService } from './recs.service';

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
  screenSize = signal<CUSTOM_BREAKPOINTS | null>(null);
  CUSTOM_BREAKPOINTS = CUSTOM_BREAKPOINTS;

  #breakpointObserver = inject(BreakpointObserver);
  filterStore = inject(FilterStore);
  listStore = inject(ListStore);
  recsService = inject(RecsService);

  ngOnInit(): void {
    // Listen for screen width changes
    this.#breakpointObserver.observe([
      CUSTOM_BREAKPOINTS.LARGE,
      CUSTOM_BREAKPOINTS.SMALL
    ])
    .pipe(takeUntil(this.destroyed))
    .subscribe((result) => {
      this.handleScreenWidthChange(result);
    })
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }

  /**
   * On screen width change, set panel settings appropriately
   * 
   * @param state The current breakpoint state showing which breakpoint was matched
   */
  handleScreenWidthChange(state: BreakpointState): void {
    for(const query of Object.keys(state.breakpoints)) {
      if (state.breakpoints[query]) {
        this.screenSize.set(query as CUSTOM_BREAKPOINTS);
      }
    }
  }

  toggleMenu(): void {
    this.sidenav().toggle();
  }

}

enum CUSTOM_BREAKPOINTS {
  LARGE = '(min-width: 700px)',
  SMALL = '(max-width: 699px)'
}
