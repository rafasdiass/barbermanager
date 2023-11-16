import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { Component } from '@angular/core';
import { ServicoService } from '../servico.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Servico } from '../servico.model';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-servico-read',
  templateUrl: './servico-read.component.html',
  styleUrls: ['./servico-read.component.scss'],
})
export class ServicoReadComponent {
  servicos: Servico[] = [];
  isMobile = false;

  displayedColumns = ['name', 'price', 'action'];
  displayedColumnsMobile = ['name', 'price', 'action'];

  constructor(
    private servicoService: ServicoService,
    private breakpointObserver: BreakpointObserver,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.servicoService.load().subscribe((servicos) => {
      this.servicos = servicos;
    });
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    this.reloadService.reloadParent$.subscribe(() => {
      this.ngOnInit();
    });
  }

  update(id: string): void {
    this.servicoService.isUpdate = true;
    this.servicoService.id = id;
    this.servicoService.isCreate = false;
    this.servicoService.isDelete = false;
    this.reloadService.reloadParent();
  }

  delete(id: string): void {
    this.servicoService.isUpdate = false;
    this.servicoService.id = id;
    this.servicoService.isCreate = false;
    this.servicoService.isDelete = true;
    this.reloadService.reloadParent();
  }
}
