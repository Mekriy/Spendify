import {Component, OnDestroy, OnInit, ViewChild, viewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Table, TableLazyLoadEvent} from "primeng/table";
import {Expense} from "../../shared/interfaces/expense";
import {Item} from "../../shared/interfaces/item";
import {ExpenseService} from "../../shared/services/expense.service";
import {PaginationExpense} from "../../shared/interfaces/pagination-expense";
import {PaginationFilter} from "../../shared/interfaces/pagination-filter";
import {Subject, takeUntil} from "rxjs";
import {
  AddItemDialogformComponent
} from "../../shared/components/add-expense/add-item-dialogform/add-item-dialogform.component";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {AddExpenseComponent} from "../../shared/components/add-expense/add-expense.component";


@Component({
  selector: 'app-your-expenses-page',
  templateUrl: './your-expenses-page.component.html',
  styleUrl: './your-expenses-page.component.scss',
  providers: [MessageService, ConfirmationService, ExpenseService, DialogService, DynamicDialogRef]
})
export class YourExpensesPageComponent implements OnDestroy{
  expenseDialog: boolean = false;
  paginationExpenses!: PaginationExpense[];
  paginationExpense!: PaginationExpense;
  totalRecords: number = 1;
  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 5,
    sortColumn: "Date",
    sortDirection: 1
  }

  unsubscribe$: Subject<void> = new Subject<void>();

  selectedExpenses!: PaginationExpense[] | null;
  submitted: boolean = false;

  items!: Item[] | null;
  expenseDetailsDialog: boolean = false;

  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  zoom!: number;
  expenseLocationDialog!: boolean;
  markerPositions: google.maps.LatLngLiteral[] = [];

  @ViewChild('dt') dt: Table | undefined;
  layout: 'list' | 'grid' = 'list';

  constructor(private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private expenseService: ExpenseService,
              private dialogService: DialogService,
              private ref: DynamicDialogRef){}


  loadExpenses($event: TableLazyLoadEvent): void {
    this.paginationFilter.pageNumber = $event.first || 0;
    this.paginationFilter.pageSize = $event.rows || 5;
    this.paginationFilter.sortColumn = $event.sortField?.toString() || 'Date';
    this.paginationFilter.sortDirection = $event.sortOrder || 1;

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

    this.ref.onClose.subscribe((data: PaginationExpense[] | any ) => {
      if (data && data.length > 0) {
        //TODO: service to post expense on db if ok add to array if not show error
        this.paginationExpenses.push(...data);
        // this.messageService.add({ severity: 'info', summary:'Expense added successfully', life: 3000})
      }
    });
  }

  deleteSelectedExpenses(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your expenses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.paginationExpenses = this.paginationExpenses.filter((val) => !this.selectedExpenses?.includes(val));
        this.selectedExpenses = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000 });
    }
    })
  }

  editExpense(expense: PaginationExpense){
      this.paginationExpense = { ...expense};
      this.expenseDialog = true;
  }

  deleteExpense(expense: PaginationExpense){
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this expense?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.paginationExpenses = this.paginationExpenses.filter((val) => val.id !== expense.id);
            this.paginationExpense = {};
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000 });
        }
    });
  }

  hideDialog(){
    this.expenseDialog = false;
    this.submitted = false;
  }

  saveExpense(){
    this.submitted = true;

    if(this.paginationExpense.id?.trim()){
      if(this.paginationExpense.id) {
        this.paginationExpenses[this.findIndexById(this.paginationExpense.id)] = this.paginationExpense;

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense updated', life: 3000});
      } else {
        this.paginationExpenses.push(this.paginationExpense)  ;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Created', life: 3000 });
      }

      this.paginationExpenses = [...this.paginationExpenses];
      this.expenseDialog = false;
      this.paginationExpense = {};
    }
  }

  findIndexById(id: string): number{
    let index = -1;
    for(let i = 0; i < this.paginationExpenses.length; i++){
      if(this.paginationExpenses[i].id === id){
        index = i;
        break;
      }
    }
    return index;
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

  applyFilter($event: Event, contains: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, contains);
  }


  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
