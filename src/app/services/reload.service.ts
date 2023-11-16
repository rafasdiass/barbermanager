import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReloadService {
  private reloadSubject = new Subject<void>();

  reloadParent$ = this.reloadSubject.asObservable();

  reloadParent() {
    this.reloadSubject.next();
  }
}
