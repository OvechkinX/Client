import { NgModule } from '@angular/core';
import {MatButtonModule, MatTableModule, MatPaginatorModule,
        MatSortModule, MatFormFieldModule, MatInputModule,
         MatIconModule, MatCardModule, MatGridListModule, MatDialogModule, MatExpansionModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

const MaterialComponents = [
  BrowserModule,
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatGridListModule,
  MatDialogModule,
  MatExpansionModule
];

@NgModule({
  imports: [MaterialComponents],
  exports: [MaterialComponents]
})
export class MaterialModule { }
