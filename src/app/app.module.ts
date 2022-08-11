import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MatColumnResizeDirective } from './directives/mat-column-resize.directive';
import { MaterialColumnSelectorComponent } from './components/material-column-selector/material-column-selector.component';
import { FabResizeColumnDirective } from './directives/fab-resize-column.directive';

@NgModule({
  declarations: [
    AppComponent,
    MaterialTableComponent,
    MatColumnResizeDirective,
    MaterialColumnSelectorComponent,
    FabResizeColumnDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
