import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  ColumnCustomizerData,
  ColumnCustomizerEvent,
} from 'src/app/models/column-customizer.model';
import { MaterialTableColumn } from 'src/app/models/material-table-column.model';

@Component({
  selector: 'app-material-column-selector',
  templateUrl: './material-column-selector.component.html',
  styleUrls: ['./material-column-selector.component.scss'],
})
export class MaterialColumnSelectorComponent implements OnInit {
  avaliableColumns: MaterialTableColumn[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ColumnCustomizerData,
    public dialogRef: MatDialogRef<MaterialColumnSelectorComponent>
  ) {}

  ngOnInit(): void {
    this.avaliableColumns = this.data.avaliableColumns.map((cl) => ({
      ...cl,
      active: this.data.displayColumns.some((dcl) => dcl.column === cl.column),
    }));
  }

  droppedHandler(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.avaliableColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  onChecked(event: MatCheckboxChange, column: string): void {
    const columnIndex = this.avaliableColumns.findIndex(
      (cl) => cl.column === column
    );
    this.avaliableColumns[columnIndex].active = event.checked;
  }

  saveClkHandler(): void {
    const event: ColumnCustomizerEvent = {
      action: 'SAVE',
      displayColumns: this.avaliableColumns.filter((cl) => cl.active),
    };
    this.dialogRef.close(event);
  }

  cancelClkHandler(): void {
    const event: ColumnCustomizerEvent = { action: 'CANCEL' };
    this.dialogRef.close(event);
  }
}
