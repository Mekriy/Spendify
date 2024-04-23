import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient, HttpParams, HttpStatusCode} from "@angular/common/http";
import {PaginationFilter} from "../interfaces/pagination-filter";
import {Observable, ObservableInput} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {Item} from "../interfaces/item";
import {TableItemPagination} from "../interfaces/table-item-pagination";
import {AddItemsToExpense} from "../interfaces/add-items-to-expense";
import {CreateItem} from "../interfaces/create-item";
import {UpdateItem} from "../interfaces/updates/update-item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly apiUrl = `${environment.apiUrl}/Item`;
  constructor(private readonly httpClient: HttpClient) { }

  public getItemsPagination(filter: PaginationFilter): Observable<PaginationResponse<TableItemPagination[]>> {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc')
      .set('typeItemsVisibility', (filter.typeItemsVisibility === null ? 'all' : filter.typeItemsVisibility!));

    return this.httpClient.get<PaginationResponse<TableItemPagination[]>>(this.apiUrl, { params });
  }

  public addItems(items: AddItemsToExpense) {
    return this.httpClient.post(environment.apiUrl+`/Expense/add-items`, items)
  }

  createItem(createItem: CreateItem) {
    return this.httpClient.post(this.apiUrl, createItem);
  }

  updateItem(itemToUpdate: UpdateItem, id: string) {
    return this.httpClient.put(this.apiUrl+`/${id}`, itemToUpdate);
  }

  delete(id: string) {
    return this.httpClient.delete(this.apiUrl+`/${id}`);
  }
}
