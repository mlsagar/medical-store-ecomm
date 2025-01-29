import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Response } from '../core/response';
import { Observable } from 'rxjs';


export interface Product {
    _id: string;
    name: string;
    company_name: string;
    image: string;
    stock: number;
    price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService { 

  baseUrl = environment.BASE_API_URL;
  routes = environment.ROUTES;
  constructor(
    private _http: HttpClient
  ) { }

  allProducts(count: number): Observable<Response<Product>> {
    return this._http.get<Response<Product>>(this.baseUrl + this.routes.PRODUCTS + "?count=" + count);
  }

  oneProduct(productId: string) {
    return this._http.get<Response<Product>>(this.baseUrl + this.routes.PRODUCTS + "/" + productId);
  }

//   login(loginRequest: LoginUser) {
//     return this._http.post<Response<[]>>(this.baseUrl + this.routes.USERS + this.routes.LOGIN, loginRequest);
//   }
}
