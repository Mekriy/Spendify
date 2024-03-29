import {Component, OnInit, ViewChild, viewChild} from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import {Table} from "primeng/table";

interface ExpenseWithItems {
  id?: string;
  price?: number;
  date?: Date;
  category?: Category;
  location?: Location;
  items?: Item[];
}
interface Item {
  name?: string;
  price?: number;
  quantity?: number;
  review?: number;
}
interface Category{
  name?: string
}
interface Location{
  name?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

@Component({
  selector: 'app-your-expenses-page',
  templateUrl: './your-expenses-page.component.html',
  styleUrl: './your-expenses-page.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class YourExpensesPageComponent implements OnInit{

  expenseDialog: boolean = false;
  expenses!: ExpenseWithItems[];
  expense!: ExpenseWithItems;

  selectedExpenses!: ExpenseWithItems[] | null;
  submitted: boolean = false;

  items!: Item[] | null;
  expenseDetailsDialog: boolean = false;

  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  zoom!: number;
  expenseLocationDialog!: boolean;
  markerPositions: google.maps.LatLngLiteral[] = [];

  @ViewChild('dt') dt: Table | undefined;
  layout: 'list' | 'grid' = 'list';

  constructor(private messageService: MessageService, private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.expenses = [
      {
        id: "1",
        price: 50.00,
        date: new Date("2024-03-28"),
        category: { name: "Groceries" },
        location: {
          name: 'ATB market',
          latitude: 49.930665522850425,
          longitude: 23.570525944141867,
          address: '12 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81054'
        },
        items: [
          { name: 'Milk', price: 10.00, quantity: 2, review: 4 },
          { name: 'Travel to Work', price: 20.00, quantity: 1, review: 3 },
          { name: 'Pay Electricity Bill', price: 20.00, quantity: 1, review: 5 }
        ]
      },
      {
        id: "2",
        price: 120.00,
        date: new Date("2024-03-27"),
        category: { name: "Electronics" },
        location: {
          name: 'WOG gas station',
          latitude: 49.92592065881233,
          longitude: 23.5735749452971,
          address: '2 Lvivska Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Dine at Restaurant', price: 100.00, quantity: 1, review: 4 },
          { name: 'Games', price: 20.00, quantity: 1, review: 5 }
        ]
      },
      {
        id: "3",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "4",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "5",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "6",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "7",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "8",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "9",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      },
      {
        id: "10",
        price: 30.00,
        date: new Date("2024-03-26"),
        category: { name: "Books" },
        location: {
          name: 'Privat Bank',
          latitude: 49.932198697820404,
          longitude: 23.56916338206351,
          address: '1 Stepana Bandery Street, Novoiavorivsk, Lviv Oblast, 81053'
        },
        items: [
          { name: 'Milk', price: 15.00, quantity: 2, review: 3 }
        ]
      }
    ];

  }

  openNew() {
    this.expense = {};
    this.submitted = false;
    this.expenseDialog = true;
}

  deleteSelectedExpenses(){
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete your expenses?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.expenses = this.expenses.filter((val) => !this.selectedExpenses?.includes(val));
        this.selectedExpenses = null;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Deleted', life: 3000 });
    }
    })
  }

  editExpense(expense: ExpenseWithItems){
      this.expense = { ...expense};
      this.expenseDialog = true;
  }

  deleteExpense(expense: ExpenseWithItems){
      this.confirmationService.confirm({
        message: 'Are you sure you want to delete this expense?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            this.expenses = this.expenses.filter((val) => val.id !== expense.id);
            this.expense = {};
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

    if(this.expense.id?.trim()){
      if(this.expense.id) {
        this.expenses[this.findIndexById(this.expense.id)] = this.expense;

        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense updated', life: 3000});
      } else {
        this.expenses.push(this.expense)  ;
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Expense Created', life: 3000 });
      }

      this.expenses = [...this.expenses];
      this.expenseDialog = false;
      this.expense = {};
    }
  }

  findIndexById(id: string): number{
    let index = -1;
    for(let i = 0; i < this.expenses.length; i++){
      if(this.expenses[i].id === id){
        index = i;
        break;
      }
    }
    return index;
  }

  showExpenseDetails(expense: ExpenseWithItems) {
    this.items = expense.items!;
    this.expenseDetailsDialog = true;
  }

  hideExpenseDetailsDialog() {
    this.items = null;
    this.expenseDetailsDialog = false;
  }
  showExpenseLocation(expense: ExpenseWithItems){
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
}
