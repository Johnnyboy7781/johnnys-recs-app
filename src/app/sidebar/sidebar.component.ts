import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog } from '@angular/material/dialog'
import { ListInfoDialog } from './list-info-dialog/list-info-dialog.component';
import { RecsService } from '../recs.service';
import { Region } from '../data-types';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit {

  regions!: Region[];

  #dialog = inject(MatDialog);
  #recsService = inject(RecsService);

  ngOnInit(): void {
      this.#recsService.getRegions()
        .pipe(
          tap((regions) => this.regions = regions)
        ).subscribe();
  }

  openInfoDialog(): void {
    const dialogRef = this.#dialog.open(ListInfoDialog, { autoFocus: false });
  }

}
