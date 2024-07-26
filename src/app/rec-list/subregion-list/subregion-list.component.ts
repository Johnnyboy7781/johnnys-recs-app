import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Place } from '../../data-types';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-subregion-list',
  standalone: true,
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './subregion-list.component.html',
  styleUrl: './subregion-list.component.scss'
})
export class SubregionListComponent {
  subregionName = input.required<string>();
  places = input.required<Place[]>();
}
