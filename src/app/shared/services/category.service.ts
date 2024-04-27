import { Injectable } from '@angular/core';
import {DropdownCategory} from "../interfaces/dropdown-category";
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {Category} from "../interfaces/category";
import {UpdateCategory} from "../interfaces/updates/update-category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getCategories() {
    return this.httpClient.get<DropdownCategory[]>(environment.apiUrl+'/Category')
  }

  getUserCategories() {
    return this.httpClient.get<DropdownCategory[]>(environment.apiUrl+'/Category/users')
  }

  create(category: Category) {
    return this.httpClient.post<DropdownCategory>(environment.apiUrl+'/Category', category);
  }

  updateCategory(update: UpdateCategory) {
    return this.httpClient.patch(environment.apiUrl+'/Category', update);
  }

  delete(name: string) {
    return this.httpClient.delete(environment.apiUrl+`/Category/${name}`)
  }
}
