import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MaterialColumnSelectorComponent } from './components/material-column-selector/material-column-selector.component';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly customers: Customer[] = [
    {
      firstName: 'Heather',
      lastName: 'Johnson',
      contactInfo: {
        address: 'McKinney, Texas',
        email: 'heather-johnson@email.com',
        phoneNumber: '222-222-2222',
      },
      cart: [],
    },
    {
      firstName: 'Curtis',
      lastName: 'McLaughlin',
      contactInfo: {
        address: 'Houston, Texas',
        email: 'curtis-mclaughlin@email.com',
        phoneNumber: '333-333-3333',
      },
      cart: [],
    },
    {
      firstName: 'Ben',
      lastName: 'Mauro',
      contactInfo: {
        address: 'Austin, Texas',
        email: 'ben-mauro@email.com',
        phoneNumber: '444-444-4444',
      },
      cart: [],
    },
  ];

  constructor(public dialog: MatDialog) {}

  columnSelectorClkHandler(): void {
    const dialofRef = this.dialog.open(MaterialColumnSelectorComponent, {});
  }
}
