import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PaginationFilter} from "../interfaces/pagination-filter";
import {Observable} from "rxjs";
import {PaginationResponse} from "../interfaces/pagination-response";
import {PaginationExpense} from "../interfaces/pagination-expense";
import {Item} from "../interfaces/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private readonly apiUrl = `${environment.apiUrl}/Item`;
  constructor(private readonly httpClient: HttpClient) { }

  public getAll(filter: PaginationFilter): Observable<PaginationResponse<Item[]>> {
    let params = new HttpParams()
      .set('pageNumber', filter.pageNumber.toString())
      .set('pageSize', filter.pageSize.toString())
      .set('sortColumn', filter.sortColumn.toString())
      .set('sortDirection', (filter.sortDirection === 1) ? 'asc' : 'desc');

    return this.httpClient.get<PaginationResponse<Item[]>>(this.apiUrl+'/items', { params });
  }
}
