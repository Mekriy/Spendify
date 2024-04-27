import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient} from "@angular/common/http";
import {CreatedLocation} from "../interfaces/created-location";
import {Location} from "../interfaces/location";

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private readonly apiUrl = `${environment.apiUrl}/Location`;
  constructor(private readonly httpClient: HttpClient) { }

  addLocation(location: Location) {
    return this.httpClient.post<CreatedLocation>(this.apiUrl, location);
  }
  getLocations() {
    return this.httpClient.get<Location[]>(this.apiUrl);
  }
}
