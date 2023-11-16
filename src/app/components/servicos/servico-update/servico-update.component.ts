import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoService } from '../servico.service';
import { Servico } from '../servico.model';
import { ReloadService } from 'src/app/services/reload.service';

@Component({
  selector: 'app-servico-update',
  templateUrl: './servico-update.component.html',
  styleUrls: ['./servico-update.component.scss'],
})
export class ServicoUpdateComponent {
  constructor(
    private router: Router,
    private servicoService: ServicoService,
    private reloadService: ReloadService
  ) {}

  servico: Servico = {
    name: '',
    price: null,
  };

  ngOnInit(): void {
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    this.servicoService.getById(this.servicoService.id).subscribe((servico) => {
      this.servico = servico;
    });
    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
    // }
  }

  reload(): void {
    this.servicoService.getById(this.servicoService.id).subscribe((servico) => {
      this.servico = servico;
    });
  }

  submit(): void {
    this.servicoService.update(this.servico).subscribe(
      (servico) => {
        this.servicoService.showMessage(`Serviço atualizado com sucesso!`);
        this.reloadService.reloadParent();
      },
      (error) => {
        this.servicoService.showMessage(error.error.message);
      }
    );
  }

  cancel(): void {
    this.servicoService.isUpdate = false;
  }
}
