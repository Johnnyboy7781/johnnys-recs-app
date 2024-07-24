import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RecsService } from '../recs.service';
import { FilterStore } from '../filters.store';
import { SubregionListComponent } from "./subregion-list/subregion-list.component";

@Component({
  selector: 'app-rec-list',
  standalone: true,
  imports: [MatIconModule, SubregionListComponent],
  templateUrl: './rec-list.component.html',
  styleUrl: './rec-list.component.scss'
})
export class RecListComponent {
  recService = inject(RecsService);
  filterStore = inject(FilterStore);
}
