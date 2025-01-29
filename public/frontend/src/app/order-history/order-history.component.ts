import { Component, OnInit } from "@angular/core";
import { OrderHistoryService } from "../../services/order-history.service";
import { ErrorResponse } from "../../core/response";
import { MESSAGE_TYPE, ToastService } from "../shared/toast/toast.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
    selector: "app-order-history",
    imports: [CommonModule, RouterLink],
    templateUrl: "./order-history.component.html"
})

export class OrderHistoryComponent implements OnInit{
    orderHistories: any

    constructor(
        private _orderHistoryService: OrderHistoryService,
        private _toast: ToastService
    ) {}

    ngOnInit(): void {
        this.getOrderHistory()
    }

    getOrderHistory() {
        this._orderHistoryService.orderHistory
          .subscribe({
            next: this._handlingOrderHistorySuccess.bind(this),
            error: this._handlingError.bind(this)
          });
      }
    
      _handlingOrderHistorySuccess(response: any) {
        this.orderHistories = response.data;
      }
    
      _handlingError(error: ErrorResponse<any>) {
        this._toast.open({ type: MESSAGE_TYPE.ERROR, message: error.error.message })
      }

}