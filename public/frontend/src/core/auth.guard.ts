import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../environments/environment';
import { MESSAGE_TYPE, ToastService } from '../app/shared/toast/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true 
  } else {
    router.navigate([environment.ROUTES.HOME]);
    inject(ToastService).open({type: MESSAGE_TYPE.WARNING, message: environment.MESSAGES.ACCESS_DENIED})
    return false
  }

};