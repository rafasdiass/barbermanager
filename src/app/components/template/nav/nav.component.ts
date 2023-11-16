import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavService } from './nav.service';
import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { Company } from '../../company/company.model';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  isSidenavOpen: boolean;
  isSubitemOpen: boolean = false;
  isMobile: boolean = false;
  isAdmin: boolean = false;
  isLogged: boolean = false;
  company: Company = {
    name: '',
    address: '',
    phone: '',
  };

  constructor(
    private navService: NavService,
    private breakpointObserver: BreakpointObserver,
    private reloadNavService: ReloadNavService,
    private companyService: CompanyService
  ) {
    this.isSidenavOpen = !this.breakpointObserver.isMatched(
      Breakpoints.Handset
    );

    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      if (result.matches) {
        this.isSidenavOpen = false; // Fecha a sidenav quando muda para dispositivo móvel
      } else {
        this.isSidenavOpen = true; // Abre a sidenav quando muda para dispositivo não móvel
      }
    });

    this.navService.menuToggled.subscribe(() => {
      this.isSidenavOpen = !this.isSidenavOpen;
    });
  }
  ngOnInit(): void {
    this.breakpointObserver.observe(Breakpoints.Handset).subscribe((result) => {
      this.isMobile = result.matches;
    });
    this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
    this.isLogged = !!localStorage.getItem('token');

    if (localStorage.getItem('idCompany') !== null) {
      this.companyService
        .getById(localStorage.getItem('idCompany') as string)
        .subscribe((company) => {
          this.company = company;
        });
    }

    this.reloadNavService.update$.subscribe(() => {
      this.isAdmin = localStorage.getItem('isAdmin') === 'true' ? true : false;
      this.isLogged = !!localStorage.getItem('token');

      if (localStorage.getItem('idCompany') !== null) {
        this.companyService
          .getById(localStorage.getItem('idCompany') as string)
          .subscribe((company) => {
            this.company = company;
          });
      }
    });
  }

  toggleSubitem(): void {
    this.isSubitemOpen = !this.isSubitemOpen;
  }

  closeNavSide(): void {
    this.isSidenavOpen = false;
  }
}
