import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Product, ProductService } from "../../services/product.service";
import { ErrorResponse, Response } from "../../core/response";
import { MESSAGE_TYPE, ToastService } from "../shared/toast/toast.service";
import { CommonModule } from "@angular/common";

@Component({
    selector: "app-product",
    imports: [CommonModule],
    templateUrl: "./product.component.html"
})

export class ProductComponent implements OnInit{
    productId!: string;
    product!: Product;

    constructor(
        private _route: ActivatedRoute,
        private _productService: ProductService,
        private _toast: ToastService
    ) {
        this.productId = this._route.snapshot.params["productId"];
    }

    ngOnInit(): void {
        this.getOneArticle();
    }

    getOneArticle() {
        this._productService.oneProduct(this.productId)
        .subscribe({
          next: this._handlingAllArticlseSuccess.bind(this),
          error: this._handlingError.bind(this)
        });
      }
    
      _handlingAllArticlseSuccess(response: Response<Product>) {
        this.product =  response.data[0];
      }
    
      _handlingError(error: ErrorResponse<any>) {
        this._toast.open({type: MESSAGE_TYPE.ERROR, message: error.error.message})
      }

}