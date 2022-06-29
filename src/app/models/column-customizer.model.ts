import { DisplayColumn } from './display-column.model';
import { MaterialTableColumn } from './material-table-column.model';

export interface ColumnCustomizerData {
  avaliableColumns: MaterialTableColumn[];
  displayColumns: DisplayColumn[];
}

export interface ColumnCustomizerEvent {
  action: 'CANCEL' | 'SAVE';
  displayColumns?: DisplayColumn[];
}
