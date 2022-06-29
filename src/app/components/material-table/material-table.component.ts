import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AVALIABLE_COLUMNS, DEFAULT_COLUMNS } from 'src/app/constants/material-table.constants';
import { MaterialTableColumn } from 'src/app/models/material-table-column.model';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
})
export class MaterialTableComponent implements OnInit {
  // Input Bindings.
  @Input() dataSource: any;
  @Input() total: number = 0;
  @Input() displayColumns: string[] = DEFAULT_COLUMNS;

  // Output Bindings.
  @Output() sortChange = new EventEmitter<any>();

  readonly avaliableColumns: MaterialTableColumn[] = AVALIABLE_COLUMNS;
  readonly pageSizeOptions: number[] = [5, 10, 25, 50];

  pageSize: number = 10;
  pageIndex: number = 0;

  constructor() {}

  ngOnInit(): void {}

  sortChangeHandler(event: any): void {
    this.sortChange.emit(event);
  }

  droppedHandler(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.displayColumns,
      event.previousIndex,
      event.currentIndex
    );
  }

  columnResizeHandler(event: number, column: string): void {
    const columnIdx = this.avaliableColumns.findIndex(
      (cl: MaterialTableColumn) => cl.column === column
    );

    if (columnIdx < 0) {
      throw new Error(
        `Invalid Argument: column ${column} is not an avaliable column`
      );
    }

    this.avaliableColumns[columnIdx].width = event;
    // Todo: Implement EventEmitter to update column width.
  }

  getColumnValue(element: any, field: string): void {
    const error = this._validateField(field);

    if (error) {
      throw error;
    }

    const keys = field.split('.');
    let value: any = element;

    for (const key of keys) {
      value = value[key];
    }

    return value;
  }

  private _validateField(field: string): Error | undefined {
    const fieldRegex = /^(([a-zA-Z0-9](\.)?)*)+$/;
    let error: Error | undefined;

    if (!field || field.trim().length === 0) {
      error = new Error(
        'Invalid Argument: field cannot be null/undefined or an empty string.'
      );
    }
    
    if (!fieldRegex.test(field)) {
      error = new Error(
        `Invalid Argument: field ${field} is not a valid pattern (e.g. "field" or "field.field").`
      );
    }

    return error;
  }

  pageHandler(event: any): void {
    // Todo: Implement pageHandler method.
  }
}
