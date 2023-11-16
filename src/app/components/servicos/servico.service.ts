import { Observable } from 'rxjs';
import { Servico } from './servico.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { api } from 'src/api';

@Injectable({
  providedIn: 'root',
})
export class ServicoService {
  url = api.url + 'services';
  isCreate = true;
  isUpdate = false;
  isDelete = false;
  id: string = '';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  load(): Observable<Servico[]> {
    return this.http.get<Servico[]>(
      this.url + '/companys/' + localStorage.getItem('idCompany')
    );
  }

  create(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(
      this.url + '/' + localStorage.getItem('idCompany'),
      servico
    );
  }

  update(servico: Servico): Observable<Servico> {
    return this.http.put<Servico>(`${this.url}/${servico._id}`, servico);
  }

  getById(id: string): Observable<Servico> {
    return this.http.get<Servico>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<Servico> {
    return this.http.delete<Servico>(`${this.url}/${id}`);
  }
}
