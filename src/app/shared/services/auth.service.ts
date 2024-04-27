import { Injectable } from '@angular/core';
import {environment} from "../../environment";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Login} from "../interfaces/login";
import {Register} from "../interfaces/register";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {CreateUser} from "../interfaces/create-user";
import {TokenResponse} from "../interfaces/token-response";
import {User} from "../interfaces/user";
import {UserCreatedInfo} from "../interfaces/statistic/user-created-info";
import {UpdateUserFullname} from "../interfaces/updates/update-user-fullname";
import {ResetCode} from "../interfaces/reset-code";
import {UpdatePassword} from "../interfaces/updates/update-password";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = `${environment.apiUrl}/User`;
  private readonly apiNgrokUrl = `${environment.apiSecurityNgrok}/User`;

  user: User = {
    id: "",
    email: "",
    firstName: "user",
    lastName: "",
    fileName: "",
    roleName: "",
  }
  public imageData: string | ArrayBuffer | Blob | null = "./assets/images/defaultUserImage.png";

  constructor(private readonly httpClient: HttpClient, private readonly router: Router) {
  }

  login(loginObj: Login): Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(this.apiNgrokUrl + '/login', loginObj);
  }

  register(registerObj: Register):Observable<any> {
    return this.httpClient.post(this.apiNgrokUrl + '/register', registerObj)
  }

  isUserCreated(){
    return this.httpClient.get<User>(this.apiUrl+'/isCreated', {});
  }
  createUser(userObj: CreateUser):Observable<User> {
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    return this.httpClient.post<User>(this.apiUrl, userObj);
  }

  refreshToken(tokens: TokenResponse):Observable<TokenResponse>{
    return this.httpClient.post<TokenResponse>(this.apiNgrokUrl+'/tokens', tokens);
  }

  isUserExists(email: string) {
    let options = {
      headers: new HttpHeaders()
        .set("ngrok-skip-browser-warning", "69420")
    }
    return this.httpClient.get(this.apiNgrokUrl+`/${email}`, options);
  }
  getUser(){
    return this.httpClient.get<User>(this.apiUrl);
  }
  getUserPhoto(fileName: string){
    return this.httpClient.get(this.apiUrl+`/${fileName}`, { responseType: "blob"});
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    this.router.navigateByUrl('/').then(() => window.location.reload());
  }

  updateUser(userInfo: UpdateUserFullname) {
    return this.httpClient.patch<User>(this.apiUrl, userInfo);
  }



  getUserCreatedData() {
    return this.httpClient.get<UserCreatedInfo>(this.apiUrl+'/created');
  }

  delete() {
    return this.httpClient.delete(this.apiUrl)
  }

  uploadFile(userPhoto: File) {
    let formData = new FormData();
    formData.append('file', userPhoto);

    const headers = new HttpHeaders()
      .append("Content-Disposition", 'multipart/form-data');

    return this.httpClient.post<any>(this.apiUrl+'/upload', formData, {headers})
  }
  sendResetCode(sendToUser: ResetCode) {
    return this.httpClient.post(this.apiNgrokUrl+'/reset', sendToUser)
  }
  changePassword(passChange: UpdatePassword) {
    return this.httpClient.patch(this.apiNgrokUrl+'/verify-reset-code', passChange)
  }
}
