import { Injectable } from '@angular/core';
import {User} from "../interfaces/user";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../environment";
import {TableItemPagination} from "../interfaces/table-item-pagination";
import {PaginationFilter} from "../interfaces/pagination-filter";
import {PaginationResponse} from "../interfaces/pagination-response";
import {TodayExpensesByCategories} from "../interfaces/statistic/today-expenses-by-categories";
import {GeneralInfo} from "../interfaces/statistic/general-info";
import {PaginationExpense} from "../interfaces/pagination-expense";
import {UserCreatedInfo} from "../interfaces/statistic/user-created-info";
import {Observable} from "rxjs";
import {ItemToBePublic} from "../interfaces/item-to-be-public";
import {UpdateCategory} from "../interfaces/updates/update-category";
import {Category} from "../interfaces/category";

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = environment.apiUrl + '/Admin'
  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getPrivateItems(filter: PaginationFilter){
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc')
      .set('typeItemsVisibility', (filter.typeItemsVisibility === null ? 'all' : filter.typeItemsVisibility!));

    return this.httpClient.get<PaginationResponse<TableItemPagination[]>>(this.apiUrl, {params});
  }

  getStatistic() {
    return this.httpClient.get<TodayExpensesByCategories[]>(this.apiUrl+'/statistic');
  }
  getGeneralInfo() {
    return this.httpClient.get<GeneralInfo>(this.apiUrl+'/general-info');
  }

  changeItemVisibility(id: ItemToBePublic) {
    return this.httpClient.patch(this.apiUrl, id);
  }

  getUserInfo(query: string) {
    return this.httpClient.get<User[]>(this.apiUrl+`/search?query=${query}`)
  }
  getUserPhoto(fileName: string){
    return this.httpClient.get(environment.apiUrl+`/User/${fileName}`, { responseType: "blob"});
  }

  getUsers(filter: PaginationFilter, userId: string) {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc')
      .set('filter', (filter.filter!));

    return this.httpClient.get<PaginationResponse<PaginationExpense[]>>(this.apiUrl+`/${userId}`, { params });
  }

  getUsersCreatedInfo(userId: string): Observable<UserCreatedInfo> {
    return this.httpClient.get<UserCreatedInfo>(this.apiUrl+`/users/${userId}`);
  }

  updateCategory(update: UpdateCategory) {
    return this.httpClient.patch(this.apiUrl+'/category', update);
  }

  delete(s: string) {
    return this.httpClient.delete(this.apiUrl+`/category/${s}`)
  }

  getCategories() {
    return this.httpClient.get<Category[]>(this.apiUrl+'/categories')
  }

  createCategory(category: Category) {
    return this.httpClient.post(this.apiUrl+'/category', category)
  }
}
