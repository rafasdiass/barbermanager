import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadNavService {
  private reloadSubject = new Subject<void>();

  update$ = this.reloadSubject.asObservable();

  update() {
    this.reloadSubject.next();
  }
}
