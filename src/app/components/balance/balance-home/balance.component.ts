import { ServiceExecuted } from './../../service-executed/serviceExecuted.model';
import { Component, OnInit } from '@angular/core';
import { Servico } from '../../servicos/servico.model';
import { ServicoService } from '../../servicos/servico.service';
import { BalanceService } from '../balance.service';
import { ReloadService } from 'src/app/services/reload.service';
import { ServiceExecutedService } from '../../service-executed/service-executed.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss'],
})
export class BalanceComponent implements OnInit {
  months = [
    { id: 0, month: 'Janeiro' },
    { id: 1, month: 'Fevereiro' },
    { id: 2, month: 'Março' },
    { id: 3, month: 'Abril' },
    { id: 4, month: 'Maio' },
    { id: 5, month: 'Junho' },
    { id: 6, month: 'Julho' },
    { id: 7, month: 'Agosto' },
    { id: 8, month: 'Setembro' },
    { id: 9, month: 'Outubro' },
    { id: 10, month: 'Novembro' },
    { id: 11, month: 'Dezembro' },
  ];

  selectedMonth: number = new Date().getMonth();

  constructor(
    public balanceService: BalanceService,
    private reloadService: ReloadService,
    private serviceExecutedService: ServiceExecutedService
  ) {}

  sericesExecuteds: ServiceExecuted[] =
    this.balanceService.servicesExecuteds.filter((serviceExecuted) => {
      const paymentDate = new Date(serviceExecuted.paymentDate);
      return paymentDate.getMonth() === this.balanceService.actualMonth;
    });

  ngOnInit(): void {
    this.reloadService.reloadParent$.subscribe(() => {
      this.filterServicos();
    });

    this.serviceExecutedService.load().subscribe((servicesExecuteds) => {
      this.sericesExecuteds = servicesExecuteds.filter((serviceExecuted) => {
        const paymentDate = new Date(serviceExecuted.paymentDate);
        return (
          paymentDate.getMonth() === this.balanceService.actualMonth &&
          serviceExecuted.paymentMethod !== 'Installments'
        );
      });
    });
  }

  filterServicos() {
    this.sericesExecuteds = this.balanceService.servicesExecuteds.filter(
      (serviceExecuted) => {
        const paymentDate = new Date(serviceExecuted.paymentDate);
        return (
          paymentDate.getMonth() === this.balanceService.actualMonth &&
          serviceExecuted.paymentMethod !== 'Installments'
        );
      }
    );
  }

  getTotalEntradas(): number {
    return this.sericesExecuteds.reduce((acumulator, serviceExecuted) => {
      return acumulator + serviceExecuted.value;
    }, 0);
  }

  getTotalDespesas(): number {
    return this.balanceService.costs.reduce((acumulator, cost) => {
      return acumulator + cost.value!!;
    }, 0);
  }

  getTotal(): number {
    return this.getTotalEntradas() - this.getTotalDespesas();
  }

  reload(): void {
    this.reloadService.reloadParent();
  }

  previus(): void {
    if (this.balanceService.actualMonth == 0) {
      this.balanceService.actualMonth = 11;
    } else {
      this.balanceService.actualMonth = this.balanceService.actualMonth - 1;
    }
    this.reloadService.reloadParent();
  }

  next(): void {
    if (this.balanceService.actualMonth == 11) {
      this.balanceService.actualMonth = 0;
    } else {
      this.balanceService.actualMonth = this.balanceService.actualMonth + 1;
    }
    this.reloadService.reloadParent();
  }
}
