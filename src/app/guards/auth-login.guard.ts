import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // Implemente a lógica de autenticação/autorização aqui
    // Por exemplo, verifique se o usuário está autenticado
    const isAuthenticated = localStorage.getItem('token') ? true : false; // Lógica para verificar autenticação

    if (isAuthenticated) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/login']); // Redireciona para a página de login
      return false; // Impede o acesso à rota
    }
  }
}
