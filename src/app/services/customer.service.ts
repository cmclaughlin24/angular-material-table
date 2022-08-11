import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { customers } from '../constants/customer-data.constants';
import { Customer } from '../models/customer.model';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor() {}

  findAll(): Observable<Customer[]> {
    return of(customers);
  }
}
