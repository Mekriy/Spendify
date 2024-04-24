import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddItemDialogformComponent } from '../add-item-dialogform/add-item-dialogform.component';
import {Item} from '../../interfaces/item';
import {AddLocationDialogformComponent} from "../add-location-dialogform/add-location-dialogform.component";
import {Location} from "../../interfaces/location";
import {ExpenseService} from "../../services/expense.service";
import {Subject, switchMap, takeUntil} from "rxjs";
import {AddExpense} from "../../interfaces/add-expense";
import {DropdownCategory} from "../../interfaces/dropdown-category";
import {ItemService} from "../../services/item.service";
import {CreatedExpense} from "../../interfaces/created-expense";
import {AddItemsToExpense} from "../../interfaces/add-items-to-expense";
import {AddCategoryDialogFormComponent} from "../add-category-dialog-form/add-category-dialog-form.component";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss'],
  providers: [DialogService, MessageService, DynamicDialogRef, ExpenseService]
})
export class AddExpenseComponent implements OnInit, OnDestroy {
  createdExpense!: CreatedExpense;
  categories: DropdownCategory[] = [];
  totalPrice: number | undefined;

  nameOfLocation: string | undefined;
  location!: Location | null;

  item: Item[] = [];
  items: { id: string; name: string; price: number; quantity: number; }[] = [];
  addButtonLock: boolean = false;

  unsubscribe$: Subject<void> = new Subject<void>();
  category!: DropdownCategory | null;
  categoryOutput!: string;

  constructor(
    private dialogService: DialogService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private readonly expenseService: ExpenseService,
    private readonly itemService: ItemService) {}

  ngOnInit(): void {
  }

  onSubmit() {
    let expense: AddExpense = {
      price: this.totalPrice!,
      categoryId: this.category!.id,
      locationId: this.location!.id
    }
    return this.expenseService.addExpense(expense)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((res: any) => {
          this.createdExpense = res;
          let request: AddItemsToExpense = {
            expenseId: this.createdExpense.id,
            items: this.items.map(item => ({
              id: item.id,
              quantity: item.quantity
            }))
          };
          return this.itemService.addItems(request)
            .pipe(
              takeUntil(this.unsubscribe$),
            )
        })
      )
      .subscribe({
        next: () => {
          this.messageService.add({ severity:'success', summary:'Success!', detail:'Expense was created successfully', life: 3000});
          this.ref.close(true);
        },
        error: () => this.ref.close(false),
      })
  }
  showAddItemsToExpenseDialog() {
    this.ref = this.dialogService.open(AddItemDialogformComponent, {
      header: 'Select an item',
      width: '80vw',
      height: '80vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    this.ref.onClose.subscribe((data: { id: string; name: string; price: number; quantity: number; }[]) => {
      this.items = [];
      data.forEach((item: { id: string; name: string; price: number; quantity: number; }) => {
        this.items.push({
          id: item.id,
          name: item.name!,
          price: item.price,
          quantity: item.quantity
        });
      });
      this.totalPrice = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
      }, 0);
    });
  }
  showAddLocationDialog() {
    this.ref = this.dialogService.open(AddLocationDialogformComponent, {
      header: 'Add Location',
      width: '30vw',
      height: '36rem',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
    this.ref.onClose.subscribe((location: Location) => {
      if (location) {
        this.location = location;
        this.nameOfLocation = location.name!;
      }
      else{
        this.location = null;
        this.nameOfLocation = "no location";
      }
    });
  }
  showAddCategoryDialog() {
    this.ref = this.dialogService.open(AddCategoryDialogFormComponent, {
      header: 'Add Category',
      width: '36vw',
      height: '25rem',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
    this.ref.onClose.subscribe((category: DropdownCategory) => {
      if (category) {
        this.category = category;
        this.categoryOutput = category.name!;
      }
      else{
        this.category = null;
        this.categoryOutput = "no category";
      }
    });
  }
  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
