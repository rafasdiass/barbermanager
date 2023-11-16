import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceExecutedCreate } from './serviceExecutedCreate.model';
import { api } from 'src/api';
import { ServiceExecuted } from './serviceExecuted.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ServiceExecutedService {
  url = api.url + 'servicesExecuteds/';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  showMessage(msg: string): void {
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  create(
    serviceExecutedCreate: ServiceExecutedCreate
  ): Observable<ServiceExecutedCreate> {
    return this.http.post(this.url, serviceExecutedCreate);
  }

  load(): Observable<ServiceExecuted[]> {
    return this.http.get<ServiceExecuted[]>(
      this.url + '/company/' + localStorage.getItem('idCompany')
    );
  }

  getById(id: string): Observable<ServiceExecuted> {
    return this.http.get<ServiceExecuted>(this.url + '/' + id);
  }

  getByClient(id: string): Observable<ServiceExecuted[]> {
    return this.http.get<ServiceExecuted[]>(this.url + '/client/' + id);
  }

  updateById(
    serviceExecuted: ServiceExecutedCreate
  ): Observable<ServiceExecutedCreate> {
    return this.http.put<ServiceExecutedCreate>(
      this.url + serviceExecuted._id,
      serviceExecuted
    );
  }

  getRowClass(row: any): string {
    if (row.value > 100) {
      return 'red';
    } else {
      return '';
    }
  }

  deleteById(id: string): Observable<ServiceExecuted> {
    return this.http.delete<ServiceExecuted>(this.url + '/' + id);
  }
}
