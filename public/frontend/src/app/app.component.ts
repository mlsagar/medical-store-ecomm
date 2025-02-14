import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { ToastComponent } from './shared/toast/toast.component';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavigationComponent, FooterComponent, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    const isTokenPresent = this._authService.userToken;
    this._setAuthServiceIsLoggedIn(isTokenPresent); 
  }

  _setAuthServiceIsLoggedIn(isTokenPresent: string | null) {
    if (isTokenPresent) {
      this._authService.isLoggedIn = true;
      return;
    }
    this._authService.isLoggedIn = false;
  }
}
