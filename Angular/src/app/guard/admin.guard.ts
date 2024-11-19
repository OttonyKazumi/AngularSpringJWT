import {CanActivateFn, Router} from '@angular/router';
import {AuthServiceService} from "../service/auth-service.service";
import {inject} from "@angular/core";

export const adminGuard: CanActivateFn = (route, state) => {
  const authService: AuthServiceService = inject(AuthServiceService);
  const router = inject(Router);
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (authService.isAutenticado) {
    if (roles.includes('ADMIN')) {
      return true;
    } else {
      alert("Você não tem permissão")
      router.navigate(['/home']);
      return false;
    }
  } else {
    console.log('Você não esta autenticado');
    router.navigate(['/login']);
    return false;
  }
};
