import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const router: Router = inject(Router);
  const auth: AuthService = inject(AuthService);

  var isAuthenticated = false;

  auth.isAuthenticated.subscribe(isAuth => {
    isAuthenticated = isAuth;

  })

  if(isAuthenticated) return true;
  else {
    router.navigate(['/login']);
    return false;
  }

};
