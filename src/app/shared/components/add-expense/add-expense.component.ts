import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddItemDialogformComponent } from './add-item-dialogform/add-item-dialogform.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Expense} from '../../interfaces/expense';
import {Category} from '../../interfaces/category';
import {Item} from '../../interfaces/item';
import {AddLocationDialogformComponent} from "./add-location-dialogform/add-location-dialogform.component";
import {Location} from "../../interfaces/location";
import {PaginationExpense} from "../../interfaces/pagination-expense";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [DialogService, MessageService, DynamicDialogRef]
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  expense!: Expense;
  categories: Category[] = [];
  selectedCategory: Category | undefined;
  totalPrice: number | undefined;

  itemForm!: FormGroup;
  nameOflocation: string | undefined;
  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService,
    private ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.categories = [
      { name: 'Bills' },
      { name: 'Restaurant' },
      { name: 'Games' },
      { name: 'Products' },
      { name: 'Charity' },
      { name: 'Rent' }
    ];
    this.createItemForm();
  }

  showAddItemsToExpenseDialog() {
    this.ref = this.dialogService.open(AddItemDialogformComponent, {
      header: 'Select an item',
      width: '50vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    this.ref.onClose.subscribe((data: Item[] | any ) => {
      if (data && data.length > 0) {
        this.items.push(...data);
      }
    });
  }
  showAddLocationDialog() {
    this.ref = this.dialogService.open(AddLocationDialogformComponent, {
      header: 'Add location',
      width: '60vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
    this.ref.onClose.subscribe((location: Location | undefined) => {
      if (location) {
        this.nameOflocation = location.name;
      }
      else{
        this.nameOflocation = "no location";
      }
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }

  items: Item[] = [
    { name: 'Milk', quantity: 10 },
    { name: 'Games', quantity: 123 },
    { name: 'Restaurant meals', quantity: 200 },
  ];

  private createItemForm() {
    this.itemForm = this.fb.group({
      category: ['', Validators.required],
      price: ['', Validators.required],
      items:['', Validators.required]
    });
  }

  createExpense(expense: PaginationExpense): void {
    this.ref.close(expense);
  }

  addItem() {

  }
}
