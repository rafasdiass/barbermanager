import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  constructor(private breakpointObserver: BreakpointObserver) {}

  menuToggled: EventEmitter<void> = new EventEmitter<void>();

  isSidenavOpen: boolean = !this.breakpointObserver.isMatched(
    Breakpoints.Handset
  );

  toggleMenu(): void {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.menuToggled.emit();
  }
}
