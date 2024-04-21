import { Component } from '@angular/core';
import {User} from "../../../shared/interfaces/user";
import {AutoCompleteCompleteEvent, AutoCompleteSelectEvent} from "primeng/autocomplete";
import {AdminService} from "../../../shared/services/admin.service";
import {catchError, debounceTime, distinctUntilChanged, Subject, switchMap, take, takeUntil} from "rxjs";
import {PaginationExpense} from "../../../shared/interfaces/pagination-expense";
import {PaginationFilter} from "../../../shared/interfaces/pagination-filter";
import {TableLazyLoadEvent} from "primeng/table";
import {Expense} from "../../../shared/interfaces/expense";
import {Item} from "../../../shared/interfaces/item";
import {Category} from "../../../shared/interfaces/category";
import {Location} from "../../../shared/interfaces/location";

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrl: './user-info-page.component.scss'
})
export class UserInfoPageComponent {
  selectedUser!: User;
  suggestions!: User[];
  imageData: string | ArrayBuffer | null = "assets/images/defaultUserImage.png";
  userInfo: { firstName: string; lastName: string; email: string; } = { firstName: 'first name', lastName: 'last name', email: 'email@gmail.com' };

  userExpenses!: PaginationExpense[];
  paginationFilter: PaginationFilter = {
    pageNumber: 0,
    pageSize: 3,
    sortColumn: 'Price',
    sortDirection: 1
  };
  totalRecords: number = 0;


  constructor(private readonly adminService: AdminService) {
  }

  search($event: AutoCompleteCompleteEvent) {
    this.adminService.getUserInfo($event.query)
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      )
      .subscribe({
        next: value => this.suggestions = value,
        error: err => console.log("err: ", err)
      })
  }

  createImageFromBlob(image: Blob, fileName: string): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imageData = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    } else {
      this.imageData = "assets/images/defaultUserImage.png";
    }
  }

  getUserPhoto(fileName: string) {
    this.adminService.getUserPhoto(fileName)
      .pipe(
        take(1)
      )
      .subscribe({
        next: value => {
          this.createImageFromBlob(value, fileName);
        }
      });
  }

  userItems!: Item[];
  userCategories!: Category[]
  userLocations!: Location[];
  loadUserInfo(user: AutoCompleteSelectEvent){
    this.userInfo.firstName = user.value.firstName;
    this.userInfo.lastName = user.value.lastName;
    this.userInfo.email = user.value.email;
    this.getUserPhoto(user.value.fileName)
    this.adminService.getUsersCreatedInfo(this.selectedUser.id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next: value => {
          this.userItems = value.items;
          this.userCategories = value.categories;
          this.userLocations = value.locations;
        }
      })
  }

  unsubscribe$: Subject<void> = new Subject<void>();
  loadExpenses($event: TableLazyLoadEvent) {
    this.paginationFilter.pageNumber = $event.first || 0;
    this.paginationFilter.pageSize = $event.rows || 3;
    this.paginationFilter.sortColumn = $event.sortField?.toString() || '';
    this.paginationFilter.sortDirection = $event.sortOrder || 1;

    this.adminService.getUsers(this.paginationFilter, this.selectedUser.id)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(
        response => {
          this.userExpenses = response.data;
          this.totalRecords = response.totalRecords!;
        })
  }

  center!: google.maps.LatLngLiteral | google.maps.LatLng;
  zoom!: number;
  expenseLocationDialog!: boolean;
  markerPositions: google.maps.LatLngLiteral[] = [];
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

  items!: Item[] | null;
  expenseDetailsDialog: boolean = false;
  showExpenseDetails(expense: Expense) {
    this.items = expense.items!;
    this.expenseDetailsDialog = true;
  }
  hideExpenseDetailsDialog() {
    this.items = null;
    this.expenseDetailsDialog = false;
  }
  hideExpenseLocationDialog() {
    this.expenseLocationDialog = false;
  }
}
