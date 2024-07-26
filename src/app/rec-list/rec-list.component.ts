import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FilterStore } from '../filters.store';
import { SubregionListComponent } from "./subregion-list/subregion-list.component";
import { ListStore } from '../list.store';

@Component({
  selector: 'app-rec-list',
  standalone: true,
  imports: [MatIconModule, SubregionListComponent],
  templateUrl: './rec-list.component.html',
  styleUrl: './rec-list.component.scss'
})
export class RecListComponent {
  filterStore = inject(FilterStore);
  listStore = inject(ListStore);
}
