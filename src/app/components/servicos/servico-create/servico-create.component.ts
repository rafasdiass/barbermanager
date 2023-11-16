import { Component } from '@angular/core';
import { Servico } from '../servico.model';
import { ServicoService } from '../servico.service';
import { Router } from '@angular/router';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-servico-create',
  templateUrl: './servico-create.component.html',
  styleUrls: ['./servico-create.component.scss'],
})
export class ServicoCreateComponent {
  constructor(
    private router: Router,
    private servicoService: ServicoService,
    private reloadService: ReloadService
  ) {}

  servico: Servico = {
    name: '',
    price: null,
  };

  submit(): void {
    this.servicoService.create(this.servico).subscribe(
      (servico) => {
        this.servicoService.showMessage(
          `Serviço: ${servico.name} criada com sucesso!`
        );
        this.reloadService.reloadParent();
      },
      (error) => {
        this.servicoService.showMessage(error.error.message);
      }
    );
  }

  cancel(): void {
    this.servicoService.isCreate = false;
  }
}
