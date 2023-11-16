import { ReloadService } from './../../../../services/reload.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cost } from '../cost.model';
import { CostService } from '../cost.service';

@Component({
  selector: 'app-cost-update',
  templateUrl: './cost-update.component.html',
  styleUrls: ['./cost-update.component.scss'],
})
export class CostUpdateComponent implements OnInit {
  cost: Cost = {
    _id: '',
    idCompany: '',
    value: 0,
    description: '',
    costDate: new Date(),
  };

  id: string = '';

  constructor(
    private costService: CostService,
    private reloadService: ReloadService
  ) {}

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    this.costService.getById(this.costService.id).subscribe((cost) => {
      this.cost = cost;
    });
    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
    // }
  }

  reload() {
    this.costService.getById(this.costService.id).subscribe((cost) => {
      this.cost = cost;
    });
  }

  submit(): void {
    this.costService.update(this.cost).subscribe(
      () => {
        this.costService.showMessage('Custo atualizado com sucesso!');
        this.reloadService.reloadParent();
        this.costService.isUpdate = false;
      },
      (error) => {
        this.costService.showMessage(error.error.message);
      }
    );
  }

  cancel(): void {
    // this.router.navigate(['/cost']);
    this.costService.isUpdate = false;
  }
}
