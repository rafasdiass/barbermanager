import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { Company } from './company.model';
import { HttpClient } from '@angular/common/http';
import { api } from 'src/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Address } from '../../models/address.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  url = api.url + 'companys';

  address: Address = {
    logradouro: '',
    bairro: '',
    cep: '',
    numero: null,
    localidade: '',
  };

  isEdit = false;
  isDelete = false;

  company: Company = {
    name: '',
    address: '',
    phone: '',
  };

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  //

  load(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url);
  }

  create(company: Company): Observable<Company> {
    return this.http.post<Company>(this.url, company);
  }

  update(company: Company): Observable<Company> {
    return this.http.put<Company>(`${this.url}/${company._id}`, company);
  }

  getById(id: string): Observable<Company> {
    return this.http.get<Company>(`${this.url}/${id}`);
  }

  delete(id: string): Observable<Company> {
    // let checkIsSelectedCompany = false;
    // this.getById(id).subscribe((data) => {
    //   if (data._id) {
    //     checkIsSelectedCompany = true;
    //   }
    // });
    // if (checkIsSelectedCompany) {
    //   this.showMessage('Não é possível deletar uma empresa selecionada');
    //   return throwError('Não é possível deletar uma empresa selecionada');
    // }
    return this.http.delete<Company>(`${this.url}/${id}`);
  }

  unformatPhoneNumber(phone: string): string {
    return phone.replace(/\D/g, '');
  }

  formatPhoneNumber(phone: string): string {
    return `${phone.slice(0, 2)}-${phone.slice(2, 7)}-${phone.slice(7)}`;
  }
}
