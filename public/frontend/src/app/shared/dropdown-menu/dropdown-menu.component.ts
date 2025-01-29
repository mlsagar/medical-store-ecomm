import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickOutsideDirective } from '../../click-outside.directive';
import { Router, RouterLink } from '@angular/router';
import { UserCredentials } from '../../../core/auth.service';
import { environment } from '../../../environments/environment';

export interface Dropdown {
  name: string;
  routeLink: string;
  state?: any;
}

export interface DropdownConfig {
  config: Dropdown[]
}

@Component({
  selector: 'app-dropdown-menu',
  imports: [CommonModule, ClickOutsideDirective, RouterLink],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.css'
})
export class DropdownMenuComponent {
  showMenu = false;
  routes = environment.ROUTES

  @Input()
  dropdownConfig!: DropdownConfig;

  @Input() user!: UserCredentials;

  @Output() onLogout = new EventEmitter();

  constructor(
    private _router: Router
  ) {}


  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  clickOutside() {
    if(this.showMenu) {
      this.showMenu = false;      
    }
  }

  logout() {
    this.onLogout.emit();
  }

  profile() {
    this._router.navigate([this.routes.PROFILE])
  }

  orderHistory() {
    this._router.navigate([this.routes.ORDER_HISTORY])
  }
}
