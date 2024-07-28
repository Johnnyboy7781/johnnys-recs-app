import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RecListComponent } from "./rec-list/rec-list.component";
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Subject, takeUntil } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { animate, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RecListComponent, MatSidenavModule, MatIconModule, MatButtonModule],
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

  destroyed = new Subject<void>();
  isPanelOpen = signal<boolean>(true);
  panelMode = signal<MatDrawerMode>('side');

  #breakpointObserver = inject(BreakpointObserver);

  ngOnInit(): void {
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

  handleScreenWidthChange(state: BreakpointState): void {
    for(const query of Object.keys(state.breakpoints)) {
      if (state.breakpoints[query]) {
        switch(query) {
          case CUSTOM_BREAKPOINTS.LARGE:
            this.isPanelOpen.set(true);
            this.panelMode.set('side')
            break;
          case CUSTOM_BREAKPOINTS.SMALL:
            this.isPanelOpen.set(false);
            this.panelMode.set('over')
            break;
        }
      }
    }
  }

  toggleMenu(): void {
    this.isPanelOpen.update((state) => !state);
  }

}

enum CUSTOM_BREAKPOINTS {
  LARGE = '(min-width: 1100px)',
  SMALL = '(max-width: 1100px)'
}
