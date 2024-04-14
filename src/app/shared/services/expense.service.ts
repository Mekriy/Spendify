import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationExpense} from "../interfaces/pagination-expense";
import {PaginationFilter} from "../interfaces/pagination-filter";
import {PaginationResponse} from "../interfaces/pagination-response";
import {environment} from "../../environment";
import {LastFiveExpenses} from "../interfaces/last-five-expenses";
import {MonthlyOverview} from "../interfaces/monthly-overview";
import {Category} from "../interfaces/category";
import {AddExpense} from "../interfaces/add-expense";
import {DropdownCategory} from "../interfaces/dropdown-category";
import {CreatedExpense} from "../interfaces/created-expense";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly apiUrl = `${environment.apiUrl}/Expense`;
  constructor(private readonly httpClient: HttpClient) { }

  public getAll(filter: PaginationFilter): Observable<PaginationResponse<PaginationExpense[]>> {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc');

    return this.httpClient.get<PaginationResponse<PaginationExpense[]>>(this.apiUrl, { params });
  }
  public getAllUsers(filter: PaginationFilter): Observable<PaginationResponse<PaginationExpense[]>> {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc');

    return this.httpClient.get<PaginationResponse<PaginationExpense[]>>(this.apiUrl+'/users', { params });
  }
  public getLastTodayFiveExpenses(){
    return this.httpClient.get<LastFiveExpenses[]>(this.apiUrl+'/last-five')
  }

  getMonthlyOverview() {
    return this.httpClient.get<MonthlyOverview>(this.apiUrl+'/monthly-overview')
  }

  getCategories() {
    return this.httpClient.get<DropdownCategory[]>(environment.apiUrl+'/Category')
  }

  addExpense(expense: AddExpense) {
    return this.httpClient.post<CreatedExpense>(this.apiUrl, expense)
  }
}