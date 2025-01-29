import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../environments/environment";

@Injectable({
    providedIn: "root"
})

export class OrderHistoryService {
    baseUrl = environment.BASE_API_URL;
      routes = environment.ROUTES;
    constructor(
        private _http: HttpClient
    ) {}

    addOrder(orderRequest: any) {
        this._http.post(this.baseUrl + this.routes.ORDER_HISTORY, orderRequest);
    }

    // userOrderHistory() {
    //     this._http.get
    // }
}