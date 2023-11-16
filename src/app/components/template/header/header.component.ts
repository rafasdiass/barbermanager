import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NavService } from '../nav/nav.service';
import { UserService } from 'src/app/services/user.service';
import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { CompanyService } from '../../company/company.service';
import { Company } from '../../company/company.model';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private breakpointObserver: BreakpointObserver,
    private navService: NavService,
    private companyService: CompanyService,
    private reloadNavService: ReloadNavService,
    private reloadService: ReloadService,
    private router: Router
  ) {}

  ngOnInit() {
    this.update();
    this.reloadNavService.update$.subscribe(() => {
      this.update();
    });
  }

  companys: Company[] = [];
  selectedCompany: Company = {
    name: '',
    address: '',
    phone: '',
  };

  update() {
    if (localStorage.getItem('isAdmin') === 'true') {
      this.companyService.load().subscribe((companies) => {
        this.companys = companies;
      });
    }
    if (localStorage.getItem('idCompany') !== null) {
      this.companyService
        .getById(localStorage.getItem('idCompany') as string)
        .subscribe(
          (company) => {
            if (company === null) {
              this.selectedCompany = {
                name: '',
                address: '',
                phone: '',
              };
            } else {
              this.selectedCompany = company;
            }
          },
          (error) => {}
        );
    }
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map((result) => result.matches));

  toggleMenu(): void {
    this.navService.toggleMenu();
  }

  switchCompany(id: string): void {
    this.companyService.getById(id).subscribe((company) => {
      this.selectedCompany = company;
    });
    localStorage.setItem('idCompany', id);
    this.reloadNavService.update();
    this.reloadService.reloadParent();
    // this.router.navigate([this.location.path()]);
  }

  sair(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
    location.reload();
  }
}
