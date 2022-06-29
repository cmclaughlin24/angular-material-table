import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MaterialTableColumn } from 'src/app/models/material-table-column.model';

@Component({
  selector: 'app-material-table',
  templateUrl: './material-table.component.html',
  styleUrls: ['./material-table.component.scss'],
})
export class MaterialTableComponent implements OnInit {
  // Input Bindings.
  @Input() dataSource: any;

  // Output Bindings.
  @Output() sortChange = new EventEmitter<any>();

  readonly columns: MaterialTableColumn[] = [
    { column: 'firstName', label: 'First Name', field: 'firstName' },
    { column: 'lastName', label: 'Last Name', field: 'lastName' },
    { column: 'address', label: 'Address', field: 'contactInfo.address' },
    { column: 'email', label: 'Email', field: 'contactInfo.email' },
    { column: 'phoneNumber', label: 'Phone Number', field: 'contactInfo.phoneNumber' },
    { column: 'cart', label: 'Cart', field: 'cart' },
  ];

  displayColumns: string[] = this.columns.map(
    (column: MaterialTableColumn) => column.column
  );

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
}
