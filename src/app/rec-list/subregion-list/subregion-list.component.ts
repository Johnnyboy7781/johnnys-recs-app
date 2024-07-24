import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-subregion-list',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './subregion-list.component.html',
  styleUrl: './subregion-list.component.scss'
})
export class SubregionListComponent {

}
