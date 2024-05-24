import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


export const isAuthenticatedGuard: CanActivateFn = (route, state) => {
  const authSrv = inject(AuthService);
  const router = inject(Router);

  // const url = state.url //donde el user quiere ir
  // localStorage.setItem('url', url); 
  console.log('Guard:::::', authSrv.authStatus());

  return authSrv.authStatus() ? true : false;
};
