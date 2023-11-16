import { Client } from './client.model';
import { Injectable } from '@angular/core';
import { Address } from '../../models/address.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  url = api.url + 'clients';

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  address: Address = {
    logradouro: '',
    bairro: '',
    cep: '',
    numero: null,
    localidade: '',
  };

  client: Client = {
    name: '',
    phone: '',
    idCompanys: localStorage.getItem('idCompany') ?? '',
  };

  isEdit = false;
  isDelete = false;
  isMilitary = localStorage.getItem('isMilitary') === 'true';

  squad = ['1º Esqd', '2º Esqd', '3º Esqd', 'Esqd C Ap', 'EM'];
  pg = [
    'Cel',
    'Ten Cel',
    'Maj',
    'Cap',
    '1º Ten',
    '2º Ten',
    '1º Sgt',
    '2º Sgt',
    '3º Sgt',
    'Cb',
    'Sd EP',
    'Sd EV',
  ];

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(client: Client): Observable<Client> {
    return this.http.post<Client>(this.url, client);
  }

  load(): Observable<Client[]> {
    return this.http.get<Client[]>(
      this.url + '/companys/' + localStorage.getItem('idCompany')
    );
  }

  getById(id: string): Observable<Client> {
    return this.http.get<Client>(this.url + '/' + id);
  }

  unformatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  formatPhoneNumber(phone: string): string {
    return `${phone.slice(0, 2)}-${phone.slice(2, 7)}-${phone.slice(7)}`;
  }

  update(client: Client): Observable<Client> {
    return this.http.put<Client>(`${this.url}/${client._id}`, client);
  }

  delete(id: string): Observable<Client> {
    return this.http.delete<Client>(`${this.url}/${id}`);
  }
}
