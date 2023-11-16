import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { api } from 'src/api';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class AuthService {
  url = api.url + 'sessions';
  token: string | null;

  constructor(private http: HttpClient) {
    // Aqui você pode implementar a lógica para obter o token de autenticação do usuário
    // Pode ser a partir do armazenamento local (localStorage), cookies, uma solicitação HTTP, etc.
    // Neste exemplo, o token é armazenado em uma propriedade privada authToken
    this.token = localStorage.getItem('token');
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthModel>(this.url, { email: email, password: password })
      .pipe(
        map((data) => {
          if (data) {
            this.setToken(data.token);
            localStorage.setItem('idUser', data.user.id as string);
            localStorage.setItem('isAdmin', data.user.admin as string);
            // localStorage.setItem('isMilitary', data.user.military as string);
            localStorage.setItem('isMilitary', 'true');
            return true;
          }
          return false;
        }),
        catchError(() => of(false)) // Retorna false em caso de erro
      );
  }

  getToken(): string {
    return this.token as string;
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  clearToken(): void {
    localStorage.removeItem('token');
    this.token = null;
  }
}
