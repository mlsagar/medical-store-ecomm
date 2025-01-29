import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { DropdownMenuComponent } from '../shared/dropdown-menu/dropdown-menu.component';
import { environment } from '../../environments/environment';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-navigation',
  imports: [RouterLink, CommonModule, DropdownMenuComponent],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  public routes = environment.ROUTES;
  
  get isLoggedIn() {
    return this._authService.isLoggedIn;
  }

  get isSignUp() {
    return this._authService.isItSignUp;
  }

  get userCredentials() {
    return this._authService.userCredentials;
  }

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  logout() {
    localStorage.clear();
    this._authService.isLoggedIn = false;
    this._router.navigate([this.routes.LOGIN]);
  }
}
