import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AVALIABLE_COLUMNS } from 'src/app/constants/material-table.constants';
import { MaterialTableColumn } from 'src/app/models/material-table-column.model';

@Component({
  selector: 'app-material-column-selector',
  templateUrl: './material-column-selector.component.html',
  styleUrls: ['./material-column-selector.component.scss'],
})
export class MaterialColumnSelectorComponent implements OnInit {
  readonly avaliableColumns: MaterialTableColumn[] = [...AVALIABLE_COLUMNS];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MaterialColumnSelectorComponent>
  ) {}

  ngOnInit(): void {}

  droppedHandler(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.avaliableColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  saveClkHandler(): void {}

  cancelClkHandler(): void {
    this.dialogRef.close();
  }
}
