import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Response } from '../core/response';
import { AuthService } from '../core/auth.service';


export interface User extends LoginUser {
  name: string;
  creditCard: string;
}

export interface LoginUser {
  email: string | null;
  password: string | null;
} 

export interface UserUpdateRequest {
  name: string;
  creditCard: string;
  email: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class UsersDataService { 

  baseUrl = environment.BASE_API_URL;
  routes = environment.ROUTES;
  constructor(
    private _http: HttpClient,
    private _authService: AuthService
  ) { }

  register(registerRequest: User) {
    return this._http.post<Response<[]>>(this.baseUrl + this.routes.USERS, registerRequest);
  }

  login(loginRequest: LoginUser) {
    return this._http.post<Response<[]>>(this.baseUrl + this.routes.USERS + this.routes.LOGIN, loginRequest);
  }

  update(updateRequest: UserUpdateRequest) {
    return this._http.put<Response<[]>>(this.baseUrl + this.routes.USERS + "/" +  this._authService.userCredentials._id, updateRequest)
  }
}
