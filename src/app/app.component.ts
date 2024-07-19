import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { RecListComponent } from "./rec-list/rec-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RecListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}
