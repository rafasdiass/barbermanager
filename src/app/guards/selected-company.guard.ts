import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SelectedCompanyGuard {
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
    const isSelectedCompany = localStorage.getItem('idCompany') ? true : false; // Lógica para verificar autenticação

    if (isSelectedCompany) {
      return true; // Permite o acesso à rota
    } else {
      this.router.navigate(['/selectcompany']); // Redireciona para a página de seleção de empresa
      return false; // Impede o acesso à rota
    }
  }
}
