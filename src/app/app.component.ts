import { Component } from '@angular/core';
import { Customer } from './models/customer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'angular-material-table';

  readonly customers: Customer[] = [
    {
      firstName: 'Heather',
      lastName: 'Johnson',
      contactInfo: {
        address: 'McKinney, Texas',
        email: 'heather-johnson@gmail.com',
        phoneNumber: '222-222-2222',
      },
      cart: [],
    },
    {
      firstName: 'Curtis',
      lastName: 'McLaughlin',
      contactInfo: {
        address: 'Austin, Texas',
        email: 'curtis-mclaughlin@gmail.com',
        phoneNumber: '333-333-3333',
      },
      cart: [],
    },
  ];
}
