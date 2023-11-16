import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServicoService } from '../servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.scss'],
})
export class ServicoComponent {
  constructor(private router: Router, public servicoService: ServicoService) {}

  ngOnInit(): void {}

  navigateToServiceCreate(): void {
    this.servicoService.isCreate = true;
  }
}
