import { MaterialTableColumn } from '../models/material-table-column.model';

export const AVALIABLE_COLUMNS: MaterialTableColumn[] = [
  { column: 'firstName', label: 'First Name', field: 'firstName' },
  { column: 'lastName', label: 'Last Name', field: 'lastName' },
  { column: 'address', label: 'Address', field: 'contactInfo.address' },
  { column: 'email', label: 'Email', field: 'contactInfo.email' },
  { column: 'phoneNumber', label: 'Phone Number', field: 'contactInfo.phoneNumber' },
  { column: 'cart', label: 'Cart', field: 'cart' },
];

export const DEFAULT_COLUMNS: string[] = AVALIABLE_COLUMNS.map(
  (column: MaterialTableColumn) => column.column
);
