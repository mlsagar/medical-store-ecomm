import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Product, ProductService } from "../../services/product.service";
import { ErrorResponse, Response } from "../../core/response";
import { MESSAGE_TYPE, ToastService } from "../shared/toast/toast.service";
import { CommonModule } from "@angular/common";
import { OrderHistoryService } from "../../services/order-history.service";
import { AuthService } from "../../core/auth.service";
import { finalize } from "rxjs";
import { environment } from "../../environments/environment";

@Component({
  selector: "app-product",
  imports: [CommonModule],
  templateUrl: "./product.component.html"
})

export class ProductComponent implements OnInit {
  productId!: string;
  product!: Product;
  isButtonDisabled = false;
  routes = environment.ROUTES;

  constructor(
    private _route: ActivatedRoute,
    private _productService: ProductService,
    private _toast: ToastService,
    private _orderHistoryService: OrderHistoryService,
    private _authService: AuthService,
    private _router: Router
  ) {
    this.productId = this._route.snapshot.params["productId"];
  }

  ngOnInit(): void {
    this.getOneProduct();
  }

  routToOrderHistory() {
    this._router.navigate([this.routes.ORDER_HISTORY])
  }

  getOneProduct() {
    this._productService.oneProduct(this.productId)
      .pipe(finalize(this._enablingButton.bind(this)))
      .subscribe({
        next: this._handlingProductSuccess.bind(this),
        error: this._handlingError.bind(this)
      });
  }

  _handlingProductSuccess(response: Response<Product>) {
    this.product = response.data[0];
  }

  _handlingError(error: ErrorResponse<any>) {
    this._toast.open({ type: MESSAGE_TYPE.ERROR, message: error.error.message })
  }

  addToCart(productId: string) {
    const request = {
      userId: this._authService.userCredentials._id,
      order: [{
        productId,
        quantity: 1
      }]
    }
    this.isButtonDisabled = true;
    this._orderHistoryService.addOrder(request)
      .subscribe({
        next: this._handlingOrderHistorySuccess.bind(this),
        error: this._handlingError.bind(this)
      });
  }

  _handlingOrderHistorySuccess() {
    this.getOneProduct();
    setTimeout(() => {
      this._toast.open({ type: MESSAGE_TYPE.SUCCESS, message: "Successfully added to the cart" })
    }, 0)
  }

  _enablingButton() {
    this.isButtonDisabled = false
  }
}