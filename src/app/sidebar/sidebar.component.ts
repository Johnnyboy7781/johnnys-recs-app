import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog'
import { ListInfoDialog } from './list-info-dialog/list-info-dialog.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  #dialog = inject(MatDialog);

  openInfoDialog(): void {
    const dialogRef = this.#dialog.open(ListInfoDialog, { autoFocus: false });
  }

}
