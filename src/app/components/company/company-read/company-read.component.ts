import { Component, OnInit } from '@angular/core';
import { Company } from '../company.model';
import { CompanyService } from '../company.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReloadService } from '../../../services/reload.service';

@Component({
  selector: 'app-company-read',
  templateUrl: './company-read.component.html',
  styleUrls: ['./company-read.component.scss'],
})
export class CompanyReadComponent implements OnInit {
  companys: Company[] = [];
  isMobile = false;

  displayedColumns = ['name', 'address', 'phone', 'action'];
  displayedColumnsMobile = ['name', 'action'];

  constructor(
    private companyService: CompanyService,
    private breakpointObserver: BreakpointObserver,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.companyService.load().subscribe((compays) => {
      this.companys = compays;
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
    this.companyService.load().subscribe((compays) => {
      this.companys = compays;
    });
  }

  //quando clicar no edit vai chamar o service e epgar company pelo id
  edit(id: string): void {
    this.companyService.isDelete = false;
    this.companyService.isEdit = true;
    this.companyService.getById(id).subscribe((company) => {
      this.companyService.company = company;
      this.reloadService.reloadParent();
    });
  }

  delete(id: string): void {
    this.companyService.isEdit = true;
    this.companyService.isDelete = true;
    this.companyService.getById(id).subscribe((company) => {
      this.companyService.company = company;
      this.reloadService.reloadParent();
    });
  }
}
