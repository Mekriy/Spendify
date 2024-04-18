import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {PaginationExpense} from "../interfaces/pagination-expense";
import {PaginationFilter} from "../interfaces/pagination-filter";
import {PaginationResponse} from "../interfaces/pagination-response";
import {environment} from "../../environment";
import {LastFiveExpenses} from "../interfaces/last-five-expenses";
import {MonthlyOverview} from "../interfaces/monthly-overview";
import {AddExpense} from "../interfaces/add-expense";
import {CreatedExpense} from "../interfaces/created-expense";
import {UpdateExpense} from "../interfaces/updates/update-expense";
import {UpdateLocation} from "../interfaces/updates/update-location";
import {UpdateItems} from "../interfaces/updates/update-items";
import {UpdatedLocation} from "../interfaces/updates/updated-location";
import {UpdatedExpense} from "../interfaces/updates/updated-expense";
import {UpdatedItems} from "../interfaces/updates/updated-items";
import {ExpenseIds} from "../interfaces/expense-ids";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly apiUrl = `${environment.apiUrl}/Expense`;
  constructor(private readonly httpClient: HttpClient) { }

  public getAllUsers(filter: PaginationFilter): Observable<PaginationResponse<PaginationExpense[]>> {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc')
      .set('filter', (filter.filter!));

    return this.httpClient.get<PaginationResponse<PaginationExpense[]>>(this.apiUrl+'/users', { params });
  }
  public getLastTodayFiveExpenses(){
    return this.httpClient.get<LastFiveExpenses[]>(this.apiUrl+'/last-five')
  }

  getMonthlyOverview() {
    return this.httpClient.get<MonthlyOverview>(this.apiUrl+'/monthly-overview')
  }
  addExpense(expense: AddExpense) {
    return this.httpClient.post<CreatedExpense>(this.apiUrl, expense)
  }

  updateExpense(expense: UpdateExpense){
    return this.httpClient.put<UpdatedExpense>(this.apiUrl, expense)
  }
  updateExpenseLocation(location: UpdateLocation) {
   return this.httpClient.put<UpdatedLocation>(environment.apiUrl+'/Location', location)
  }
  updateExpenseItems(items: UpdateItems) {
    return this.httpClient.put(this.apiUrl+'/items', items)
  }

  delete(expense: string) {
    return this.httpClient.delete(this.apiUrl+`/${expense}`)
  }
  deleteExpenses(expenses: ExpenseIds[]){
    const options = {
      body: expenses
    }
    return this.httpClient.delete(this.apiUrl+'/expenses', options)
  }
}
