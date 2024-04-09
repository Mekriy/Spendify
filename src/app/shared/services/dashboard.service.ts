import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly apiUrl = `${environment.apiUrl}/Expense`;
  constructor(private readonly httpClient: HttpClient) {}

  getExpensesCountByCategories(){
    return this.httpClient.get(this.apiUrl+'by-categories')
  }
}
