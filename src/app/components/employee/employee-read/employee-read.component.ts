import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { ReloadService } from 'src/app/services/reload.service';
@Component({
  selector: 'app-employee-read',
  templateUrl: './employee-read.component.html',
  styleUrls: ['./employee-read.component.scss'],
})
export class EmployeeReadComponent {
  employees: User[] = [];
  isMobile = false;

  displayedColumns = ['name', 'email', 'phone', 'action'];
  displayedColumnsMobile = ['name', 'action'];

  constructor(
    private userService: UserService,
    private breakpointObserver: BreakpointObserver,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.userService
      .getByIdCompany()
      .subscribe((users) => {
        this.employees = users;
      });
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });
    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
  }

  reload(): void {
    this.userService
      .getByIdCompany()
      .subscribe((users) => {
        this.employees = users;
      });
  }

  formatPhoneNumber(phone: string): string {
    const phoneNumber = phone || '';
    return phoneNumber.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
