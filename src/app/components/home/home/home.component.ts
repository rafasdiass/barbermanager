import { Company } from './../../company/company.model';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from './../../../models/user.model';
import { CompanyService } from '../../company/company.service';
import { Router } from '@angular/router';
import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  companies: Company[] = [];
  selectedCompany: Company | null = null;

  constructor(
    private companyService: CompanyService,
    private reloadNavService: ReloadNavService,
    private reloadService: ReloadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.updateUser();
    // this.loadUserCompanies();
  }

  updateUser() {
    // const idUser = localStorage.getItem('idUser');
    // this.userService.getById(idUser as string).subscribe((user) => {
    //   this.companies.splice(0);
    //   user.idCompanys?.forEach((idCompany) => {
    //     this.companyService.getById(idCompany).subscribe((company) => {
    //       this.companies.push(company);
    //     });
    //   });
    // });
    // this.companies.sort();

    this.companyService.load().subscribe((companies) => {
      this.companies = companies;
    });
  }

  switchCompany(id: string): void {
    this.companyService.getById(id).subscribe((company) => {
      this.selectedCompany = company;
    });
    localStorage.setItem('idCompany', id);
    this.reloadNavService.update();
    this.reloadService.reloadParent();
    this.router.navigate(['/']);
  }
}
