import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { Cost } from './../cost.model';
import { CostService } from './../cost.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrls: ['./cost.component.scss'],
})
export class CostComponent implements OnInit {
  costs: Cost[] = []; // Inicialize a propriedade costs como um array vazio
  create: boolean = false; // Inicialize a propriedade

  constructor(
    public costService: CostService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    this.loadCosts();
    this.reloadService.reloadParent$.subscribe(() => {
      this.loadCosts();
    }); // Chame o método para carregar os custos
  }

  loadCosts(): void {
    this.costService.getAllCosts().subscribe((costs) => {
      this.costs = costs;
    });
  }

  navigateToCostCreate(): void {
    this.costService.isCreate = !this.costService.isCreate;
    // this.router.navigate(['/cost/create']);
  }
}
