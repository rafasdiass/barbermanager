import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.scss'],
})
export class EmployeeDeleteComponent {
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

  delete(): void {
    this.userService.delete(this.user.id as string).subscribe(
      (employee) => {
        this.userService.showMessage('Funcionário excluido!');
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
