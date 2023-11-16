import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.scss'],
})
export class EmployeeUpdateComponent {
  constructor(
    private router: Router,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  user: User = {
    name: '',
    email: '',
    phone: '',
    password: '',
    admin: false,
    employee: false,
    idCompanys: [],
  };

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getById(id as string).subscribe((employee) => {
      this.user = employee;
    });
  }

  submit(): void {
    this.user.phone = this.userService.formatPhoneNumber(
      this.user.phone as string
    );
    this.userService.update(this.user).subscribe(
      (employee) => {
        this.userService.showMessage(`Empresa alterada com sucesso!`);
      },
      (error) => {
        this.userService.showMessage(error.error.message);
      }
    );
    this.router.navigate(['/employee']);
  }

  cancel(): void {
    this.router.navigate(['/employee']);
  }
}
