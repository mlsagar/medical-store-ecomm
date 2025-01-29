import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { Response } from "../core/response";
import { environment } from "../environments/environment";

export interface OrderRequest {
    userId: string;
    order:{
            productId: string;
            quantity: number
        }[]
}

@Injectable({
    providedIn: "root"
})

export class OrderHistoryService {
    baseUrl = environment.BASE_API_URL;
      routes = environment.ROUTES;
    constructor(
        private _http: HttpClient,
        private _authService: AuthService
    ) {}

    addOrder(orderRequest: OrderRequest) {
        return this._http.post<Response<[]>>(this.baseUrl + this.routes.ORDER_HISTORY, orderRequest);
    }

    get orderHistory() {
        return this._http.get(this.baseUrl + this.routes.ORDER_HISTORY  + "/" + this._authService.userCredentials._id)
    }
}