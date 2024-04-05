import { NgModule } from '@angular/core';
import { DropdownModule} from 'primeng/dropdown';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import {RatingModule} from "primeng/rating";
import {TagModule} from "primeng/tag";
import {ReactiveFormsModule} from "@angular/forms";
import { PaginatorModule } from 'primeng/paginator';
import { CheckboxModule } from 'primeng/checkbox';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    DataViewModule,
    RatingModule,
    TagModule,
    ReactiveFormsModule,
    CheckboxModule,
    PaginatorModule,

  ],
  exports: [
    BrowserModule,
    BrowserAnimationsModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    InputNumberModule,
    InputTextModule,
    ToastModule,
    ToolbarModule,
    ConfirmDialogModule,
    DialogModule,
    DataViewModule,
    RatingModule,
    TagModule,
    ReactiveFormsModule,
    CheckboxModule,
    PaginatorModule,
  ],
  providers: [],
  bootstrap: []
})
export class SharedPrimeNgModules { }
