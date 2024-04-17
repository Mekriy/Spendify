import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddItemDialogformComponent } from '../add-item-dialogform/add-item-dialogform.component';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Item} from '../../interfaces/item';
import {AddLocationDialogformComponent} from "../add-location-dialogform/add-location-dialogform.component";
import {Location} from "../../interfaces/location";
import {ExpenseService} from "../../services/expense.service";
import {of, Subject, switchMap, takeUntil} from "rxjs";
import {AddExpense} from "../../interfaces/add-expense";
import {DropdownCategory} from "../../interfaces/dropdown-category";
import {ItemService} from "../../services/item.service";
import {CreatedExpense} from "../../interfaces/created-expense";
import {LocationService} from "../../services/location.service";
import {CreatedLocation} from "../../interfaces/created-location";
import {AddItemsToExpense} from "../../interfaces/add-items-to-expense";
import {AddLocationToExpense} from "../../interfaces/add-location-to-expense";
import {AddCategoryDialogFormComponent} from "../add-category-dialog-form/add-category-dialog-form.component";
import {Category} from "../../interfaces/category";

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

  expenseForm!: FormGroup;

  nameOfLocation: string | undefined;
  location!: Location | null;
  createdLocation!: CreatedLocation;

  item: Item[] = [];
  items: { id: string; name: string; price: number; quantity: number; }[] = [];
  addButtonLock: boolean = false;

  unsubscribe$: Subject<void> = new Subject<void>();
  category!: Category | null;
  categoryOutput!: string;

  constructor(
    private fb: FormBuilder,
    private dialogService: DialogService,
    private messageService: MessageService,
    private ref: DynamicDialogRef,
    private readonly expenseService: ExpenseService,
    private readonly itemService: ItemService,
    private readonly locationService: LocationService) {}

  ngOnInit(): void {
  }

  onSubmit(event: Event) {
    let expense: AddExpense = {
      price: this.totalPrice!,
      categoryName: this.category?.name!,
    }
    this.locationService.addLocation(this.location!)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((res:any)=> {
          this.createdLocation = res;
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
                    switchMap( (res: any) => {
                      if(res.message === 'Items successfully added to expense!'){
                        let addLocation: AddLocationToExpense = {
                          locationId: this.createdLocation.id,
                          expenseId: this.createdExpense.id
                        }
                        return this.locationService.addLocationToExpense(addLocation);
                      }
                      else {
                        throw new Error('Can\'t add items to expense');
                      }
                    })
                  )
              })
            )
        })
      )
      .subscribe({
        next: () => {
          this.messageService.add({ severity:'success', summary:'Success!', detail:'Expense was created successfully', life: 3000});
          this.ref.close(true);
        },
        error: err => this.ref.close(false),
      })
  }
  showAddItemsToExpenseDialog() {
    this.ref = this.dialogService.open(AddItemDialogformComponent, {
      header: 'Select an item',
      width: '70vw',
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
      console.log("location: ", location)
      if (location) {
        this.location = location;
        this.nameOfLocation = location.name!;
        console.log("nameof: ", this.nameOfLocation)
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
    this.ref.onClose.subscribe((category: Category) => {
      console.log("Category: ", category)
      if (category) {
        this.category = category;
        this.categoryOutput = category.name!;
        console.log("nameof: ", this.categoryOutput)
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
