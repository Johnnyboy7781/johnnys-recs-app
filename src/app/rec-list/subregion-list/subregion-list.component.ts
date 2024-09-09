import { Component, input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Place } from '../../data-types';
import { PlaceComponent } from './place/place.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-subregion-list',
    standalone: true,
    imports: [MatExpansionModule, PlaceComponent, CommonModule],
    templateUrl: './subregion-list.component.html',
    styleUrl: './subregion-list.component.scss'
})
export class SubregionListComponent {
    subregionName = input.required<string>();
    places = input.required<Place[]>();
}
