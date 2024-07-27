import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterStore } from '../filters.store';
import { SubregionListComponent } from "./subregion-list/subregion-list.component";
import { ListStore } from '../list.store';
import { Place } from '../data-types';
import { RecsService } from '../recs.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-rec-list',
  standalone: true,
  imports: [MatIconModule, SubregionListComponent, MatProgressSpinnerModule],
  templateUrl: './rec-list.component.html',
  styleUrl: './rec-list.component.scss'
})
export class RecListComponent {

  filterStore = inject(FilterStore);
  listStore = inject(ListStore);
  recsService = inject(RecsService);

}
