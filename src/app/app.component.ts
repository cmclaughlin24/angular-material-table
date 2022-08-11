import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MaterialColumnSelectorComponent } from './components/material-column-selector/material-column-selector.component';
import {
  AVALIABLE_COLUMNS,
  DEFAULT_COLUMNS
} from './constants/material-table.constants';
import {
  ColumnCustomizerData,
  ColumnCustomizerEvent
} from './models/column-customizer.model';
import { Customer } from './models/customer.model';
import { DisplayColumn } from './models/display-column.model';
import { CustomerService } from './services/customer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  displayColumns: DisplayColumn[] = [...DEFAULT_COLUMNS];

  readonly pageSizeOptions: number[] = [5, 10, 25, 50];

  customers$: Observable<Customer[]>;

  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    public dialog: MatDialog,
    private readonly customerService: CustomerService
  ) {}

  ngOnInit(): void {
    this.customers$ = this.customerService.findAll();
  }

  columnSelectorClkHandler(): void {
    const dialofRef = this.dialog.open(MaterialColumnSelectorComponent, {
      data: {
        avaliableColumns: [...AVALIABLE_COLUMNS],
        displayColumns: this.displayColumns,
      } as ColumnCustomizerData,
    });

    dialofRef.afterClosed().subscribe((event: ColumnCustomizerEvent) => {
      if (!event || event.action === 'CANCEL') {
        return;
      }
      this.displayColumns = event.displayColumns ? event.displayColumns : [];
    });
  }

  columnChangeHander(event: DisplayColumn[]): void {
    this.displayColumns = event;
  }

  pageHandler(event: any): void {
    // Todo: Implement pageHandler method.
  }
}
