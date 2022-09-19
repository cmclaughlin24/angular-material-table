import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  AVALIABLE_COLUMNS,
  DEFAULT_COLUMNS
} from 'src/app/constants/material-table.constants';
import {
  FabResizeEnd,
  FabResizeStart
} from 'src/app/directives/fab-resize-column.directive';
import { Customer } from 'src/app/models/customer.model';
import { DisplayColumn } from 'src/app/models/display-column.model';
import { MaterialTableColumn } from 'src/app/models/material-table-column.model';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
})
export class MaterialTableComponent implements OnInit {
  // Input Bindings.
  @Input() dataSource: any;
  @Input() displayColumns: DisplayColumn[] = [...DEFAULT_COLUMNS];

  // Output Bindings.
  @Output() sortChange = new EventEmitter<Sort>();
  @Output() columnChange = new EventEmitter<DisplayColumn[]>();
  @Output() rowSelection = new EventEmitter<Customer>();

  readonly avaliableColumns: MaterialTableColumn[] = AVALIABLE_COLUMNS;

  constructor() {}

  ngOnInit(): void {}

  get columns(): string[] {
    return this.displayColumns.map((cl) => cl.column);
  }

  getColumnWidth(column: string): number | undefined {
    const columnIdx = this._getColumnIndex(column);
    return this.displayColumns[columnIdx].width;
  }

  sortChangeHandler(event: Sort): void {
    this.sortChange.emit(event);
  }

  droppedHandler(event: CdkDragDrop<string[]>): void {
    moveItemInArray(
      this.displayColumns,
      event.previousIndex,
      event.currentIndex
    );
    this.columnChange.emit(this.displayColumns);
  }

  columnResizeStartHandler({ event }: FabResizeStart): void {
    event.stopPropagation();
  }

  columnResizeEndHandler({ event, curWidth }: FabResizeEnd, column: string): void {
    const columnIdx = this._getColumnIndex(column);
    this.displayColumns[columnIdx].width = curWidth;
    this.columnChange.emit(this.displayColumns);
  }

  private _getColumnIndex(column: string): number {
    const columnIdx = this.displayColumns.findIndex(
      (cl: DisplayColumn) => cl.column === column
    );

    if (columnIdx < 0) {
      throw new Error(
        `Invalid Argument: column ${column} is not an avaliable column`
      );
    }

    return columnIdx;
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

  rowDblClkHandler(row: Customer): void {
    this.rowSelection.emit(row);
  }
}
