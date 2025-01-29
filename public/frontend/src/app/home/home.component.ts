import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { environment } from '../../environments/environment';
import { ErrorResponse, Response } from '../reponse';
import { MESSAGE_TYPE, ToastService } from '../shared/toast/toast.service';
import { AuthService } from '../../core/auth.service';
import { Product, ProductService } from '../../services/product.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, InfiniteScrollDirective, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  title = environment.APP_TITLE;
  products: Product[] = [];

  routes = environment.ROUTES;

  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  count = environment.INITIAL_ARTICLE_COUNT;

  constructor(
    private _productService: ProductService,
    private _authService: AuthService,
    private _toast: ToastService
  ) {
  }


  ngOnInit(): void {
    this._getAllProducts();
  }

  _getAllProducts(count = environment.INITIAL_ARTICLE_COUNT) {
    this._productService.allProducts(count).subscribe({
      next: this._onGetProductSuccess.bind(this),
      error: this._onGetProductError.bind(this)
    })
  }

  _onGetProductSuccess(response: Response<any>) {
    this.products = response.data;
  }

  _onGetProductError(error: ErrorResponse<any>) {
    this._toast.open({type: MESSAGE_TYPE.ERROR, message: error.error.message});
  }
  
  onScroll() {
    if (this.isLoggedIn) {      
      if(this.products.length < this.count){
        return;
      }
      this.count += environment.INITIAL_ARTICLE_COUNT;
      this._getAllProducts(this.count);
    }
  }
}
