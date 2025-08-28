import { HttpInterceptorFn } from '@angular/common/http';
import { TokenService } from '../services/token.service';
import { inject } from '@angular/core';

export const apiAtomInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  let request = req;
  const token = tokenService.getToken();

  if (token) {
    request = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(request);
};
