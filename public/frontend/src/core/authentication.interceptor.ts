import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService, CRUD_ACTION } from './auth.service';
import { environment } from '../environments/environment';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const userUrl = environment.BASE_API_URL + environment.ROUTES.USERS;
  const authService = inject(AuthService);
  const requestHeader = environment.REQUEST_HEADER;
  if (authService.isLoggedIn && (req.method === CRUD_ACTION.GET || req.method === CRUD_ACTION.POST) && req.url.split("?")[0] !== userUrl) {
    const newRequest = req.clone({
      headers: req.headers.set(requestHeader.AUTHORIZATION, `${requestHeader.BEARER} ${authService.userToken}`)
    })
    
    return next(newRequest);
  }
  
  return next(req);


};