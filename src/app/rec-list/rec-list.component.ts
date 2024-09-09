import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterStore } from '../filters.store';
import { SubregionListComponent } from './subregion-list/subregion-list.component';
import { ListStore } from '../list.store';
import { RecsService } from '../recs.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
    animate,
    query,
    style,
    transition,
    trigger
} from '@angular/animations';

@Component({
    selector: 'app-rec-list',
    standalone: true,
    imports: [MatIconModule, SubregionListComponent, MatProgressSpinnerModule],
    templateUrl: './rec-list.component.html',
    styleUrl: './rec-list.component.scss',
    animations: [
        trigger('fade', [
            transition('* <=> *', [
                query(
                    ':enter',
                    [
                        style({ opacity: 0 }),
                        animate('300ms ease-out', style({ opacity: 1 }))
                    ],
                    { optional: true }
                )
            ])
        ])
    ]
})
export class RecListComponent {
    filterStore = inject(FilterStore);
    listStore = inject(ListStore);
    recsService = inject(RecsService);
}
