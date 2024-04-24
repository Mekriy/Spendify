import {Component, OnDestroy, ViewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Expense} from "../../shared/interfaces/expense";
import {Item} from "../../shared/interfaces/item";
import {ExpenseService} from "../../shared/services/expense.service";
import {PaginationExpense} from "../../shared/interfaces/pagination-expense";
import {PaginationFilter} from "../../shared/interfaces/pagination-filter";
import {catchError, debounceTime, of, Subject, switchMap, take, takeUntil} from "rxjs";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddExpenseComponent} from "../../shared/components/add-expense/add-expense.component";
import {
  AddLocationDialogformComponent
} from "../../shared/components/add-location-dialogform/add-location-dialogform.component";
import {Location} from "../../shared/interfaces/location";
import {
  AddCategoryDialogFormComponent
} from "../../shared/components/add-category-dialog-form/add-category-dialog-form.component";
import {AddItemDialogformComponent} from "../../shared/components/add-item-dialogform/add-item-dialogform.component";
import {UpdateExpense} from "../../shared/interfaces/updates/update-expense";
import {UpdateItems} from "../../shared/interfaces/updates/update-items";
import {ExpenseIds} from "../../shared/interfaces/expense-ids";
import {DropdownCategory} from "../../shared/interfaces/dropdown-category";
import {Router} from "@angular/router";


@Component({
  selector: 'app-your-expenses-page',
  templateUrl: './your-expenses-page.component.html',
  styleUrl: './your-expenses-page.component.scss',
  providers: [MessageService, ConfirmationService, ExpenseService, DialogService, DynamicDialogRef, Router]
})
export class YourExpensesPageComponent implements OnDestroy{
  expenseDialog: boolean = false;
  paginationExpenses!: PaginationExpense[];
  paginationExpense!: PaginationExpense;
  oldExpense!: PaginationExpense;

  totalRecords: number = 1;
  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Date",
    sortDirection: 1
  }
  searchCategory: string = '';

  unsubscribe$: Subject<void> = new Subject<void>();

  selectedExpenses!: PaginationExpense[];

  items!: Item[] | null;
  expenseDetailsDialog: boolean = false;

  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  zoom!: number;
  expenseLocationDialog!: boolean;
  markerPositions: google.maps.LatLngLiteral[] = [];

  byFilter: any;


  @ViewChild('dt') dt: Table | undefined;
  layout: 'list' | 'grid' = 'list';

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private expenseService: ExpenseService,
              private dialogService: DialogService,
              private ref: DynamicDialogRef,
              private router: Router)
  {
    this.searchCategoryChanged
      .pipe(
        debounceTime(500),
      )
      .subscribe({
        next: value => this.loadExpenses(value),
        error: err => console.log(err),
      });
  }
  searchCategoryChanged: Subject<any> = new Subject<any>()
  onSearch($event: any) {
    this.searchCategoryChanged.next($event)
  }

  loadExpenses($event: TableLazyLoadEvent): void {
    this.paginationFilter.pageNumber = $event.first || 0;
    this.paginationFilter.pageSize = $event.rows || 5;
    this.paginationFilter.sortColumn = $event.sortField?.toString() || 'Date';
    this.paginationFilter.sortDirection = $event.sortOrder || 1;
    this.paginationFilter.searchCategory = this.searchCategory || '';

    switch(this.byFilter){
      case "byWeek": {
        this.paginationFilter.filter = 'week';
        break;
      }
      case "byMonth": {
        this.paginationFilter.filter = 'month';
        break;
      }
      case "byThreeMonths": {
        this.paginationFilter.filter = 'threeMonths';
        break;
      }
      default: {
        this.paginationFilter.filter = '';
        break;
      }
    }

    this.expenseService.getAllUsers(this.paginationFilter)
      .pipe(
        takeUntil(this.unsubscribe$)
    )
      .subscribe(
        response => {
          this.paginationExpenses = response.data;
          this.totalRecords = response.totalRecords!;
        })
  }

  AddNewExpense() {
    this.ref = this.dialogService.open(AddExpenseComponent, {
      height: "425px",
      width: "650px"
    });

    this.ref.onClose.subscribe((data: boolean) => {
      if (data) {
        this.messageService.add({ severity: 'success', summary:'Expense added successfully', life: 3000})
      }
    });
  }

  expenseIds: ExpenseIds[] = [];
  deleteSelectedExpenses(expenses: PaginationExpense[]){
    this.expenseIds = [];
    expenses.forEach((expense: {id?: string}) => {
      this.expenseIds.push({ id: expense.id!})
    });

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your expenses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenseService.deleteExpenses(this.expenseIds)
          .pipe(
            catchError((err) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Expenses are not deleted${err.error.detail}`, life: 3000 });
              return of(err);
            })
          )
          .subscribe({
            next: value => console.log(value),
            error: err => console.log(err)
          })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expenses Deleted', life: 3000 });
    }
    })
  }
  deleteSelectedExpense(expense: PaginationExpense) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your expenses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenseService.delete(expense.id!)
          .pipe(
            catchError((err) => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Expense is not deleted${err.error.detail}`, life: 3000 });
              return of(err);
            })
          )
          .subscribe({
            next: value => console.log(value),
            error: err => console.log(err)
          })
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000 });
      }
    })
  }

  newCategory!: DropdownCategory;
  newLocation!: Location;
  oldLocation!: Location;
  newItems: {
    id: string,
    name: string,
    price: number,
    quantity: number,
    isNew: boolean
  }[] = [];
  editExpense(expense: PaginationExpense){
    this.oldExpense = expense;
    this.paginationExpense = { ...expense};

    this.newCategory = this.paginationExpense.category!;
    this.oldLocation = this.paginationExpense.location;
    this.newItems = [];
    this.paginationExpense.items!.forEach((oldItem: { id: string; name?: string; price?: number, quantity?: number; }) => {
      this.newItems.push({
        id: oldItem.id,
        name: oldItem.name!,
        price: oldItem.price!,
        quantity: oldItem.quantity!,
        isNew: false,
      })
    });
    this.expenseDialog = true;
  }

  hideDialog(){
    this.paginationExpense = this.oldExpense;
    this.expenseDialog = false;
  }
  saveExpense(expense: PaginationExpense){
    let updateExpense: UpdateExpense = {
      id: expense.id,
      price: expense.price,
      date: expense.date,
      categoryId: expense.category!.id,
      locationId: expense.location!.id
    }
    let updateItems: UpdateItems = {
      expenseId: expense.id!,
      items: this.newItems.filter(item => item.isNew)
    }
    this.expenseService.updateExpense(updateExpense)
      .pipe(
        takeUntil(this.unsubscribe$),
        switchMap((res:any)=>{
          if (updateItems.items.length === 0) {
            return of(res);
          } else {
            return this.expenseService.updateExpenseItems(updateItems);
          }
        })
      )
      .subscribe({
        next: value => this.expenseDialog = false,
        error: err => this.messageService.add({ severity: "error", icon:"error", summary:"Error!", detail:`Can't update item\n${err}`, life: 3000})
      })
  }

  showExpenseDetails(expense: Expense) {
    this.items = expense.items!;
    this.expenseDetailsDialog = true;
  }

  hideExpenseDetailsDialog() {
    this.items = null;
    this.expenseDetailsDialog = false;
  }
  showExpenseLocation(expense: Expense){
    this.expenseLocationDialog = true;

    this.center = {
      lat: expense.location?.latitude!,
      lng: expense.location?.longitude!
    }
    this.zoom = 18
    this.markerPositions = [
      {
        lat: expense.location?.latitude!,
        lng: expense.location?.longitude!
      }
    ]
  }

  hideExpenseLocationDialog() {
    this.expenseLocationDialog = false;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editCategory() {
    this.ref = this.dialogService.open(AddCategoryDialogFormComponent, {
      header: 'Edit Category',
      width: '36vw',
      height: '25rem',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });
    this.ref.onClose.subscribe((category: DropdownCategory) => {
      console.log("Category: ", category)
      if (category) {
        this.paginationExpense.category = category;
      }
    });
  }

  editLocation() {
    this.ref = this.dialogService.open(AddLocationDialogformComponent, {
      header: 'Edit Location',
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
        this.newLocation = location;
        this.paginationExpense.location = location
      }
    });
  }

  addItems() {
    this.ref = this.dialogService.open(AddItemDialogformComponent, {
      header: 'Add items',
      width: '70vw',
      height: '80vw',
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      }
    });

    this.ref.onClose.subscribe((data: { id: string; name: string; price: number; quantity: number; }[]) => {
      data.forEach((item: { id: string; name: string; price: number; quantity: number; }) => {
        const itemExists = this.paginationExpense.items!.some(existingItem => existingItem.id === item.id);
        if(!itemExists){
          this.newItems.push({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            isNew: true,
          })
        }
        else{
          const existingItemIndex = this.paginationExpense.items!.findIndex((i) => i.id === item.id);
          if (this.paginationExpense.items![existingItemIndex].quantity !== item.quantity) {
            this.paginationExpense.items![existingItemIndex].quantity = item.quantity;
          }
        }
      });
      this.paginationExpense.price = this.paginationExpense.items!.reduce((total, item) => {
        return total + (item.price! * item.quantity!);
      }, 0);
    });
  }

  clearFilter() {
    this.router.navigateByUrl(`/${this.router.url}`, {skipLocationChange: true}).then(() => window.location.reload())
  }
}
