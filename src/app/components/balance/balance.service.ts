import { Injectable } from '@angular/core';
import { Cost } from './cost/cost.model';
import { CostService } from './cost/cost.service';
import { ServiceExecuted } from '../service-executed/serviceExecuted.model';
import { ServiceExecutedService } from '../service-executed/service-executed.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceService {
  costs: Cost[] = [];
  actualMonth: number = new Date().getMonth();
  servicesExecuteds: ServiceExecuted[] = [];

  constructor(
    private costService: CostService,
    private serviceExecutedService: ServiceExecutedService
  ) {
    this.costService.getAllCosts().subscribe((data) => {
      this.costs = data;
    });

    this.serviceExecutedService.load().subscribe((data) => {
      this.servicesExecuteds = data;
    });
  }
}
