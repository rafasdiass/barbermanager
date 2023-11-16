import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Address } from '../models/address.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CepService {
  constructor(private http: HttpClient) {}

  getAddressByCEP(cep: string): Observable<Address> {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    return this.http.get<Address>(url);
  }
}
