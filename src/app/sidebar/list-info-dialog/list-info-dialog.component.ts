import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-list-info-dialog',
  standalone: true,
  imports: [ MatDialogContent, MatIconModule, MatButtonModule ],
  templateUrl: './list-info-dialog.component.html',
  styleUrl: './list-info-dialog.component.scss'
})
export class ListInfoDialog {

  #dialogRef = inject(MatDialogRef<ListInfoDialog>);

  onCloseClick(): void {
    this.#dialogRef.close();
  }

}
