import { ServicoService } from './../../servicos/servico.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Client } from '../../client/client.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ClientService } from '../../client/client.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Servico } from '../../servicos/servico.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { ServiceExecutedCreate } from '../serviceExecutedCreate.model';
import { ServiceExecutedService } from '../service-executed.service';
import { ReloadService } from 'src/app/services/reload.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-executed-create',
  templateUrl: './service-executed-create.component.html',
  styleUrls: ['./service-executed-create.component.scss'],
})
export class ServiceExecutedCreateComponent {
  isMilitary = localStorage.getItem('isMilitary') === 'true';
  checkBoxShow = localStorage.getItem('isMilitary') === 'true';
  serviceExecuted: ServiceExecutedCreate = {
    _id: '',
    idCompanys: localStorage.getItem('idCompany') || '',
    idServices: [],
    idClients: '',
    serviceDate: new Date(),
    paymentDate: new Date(),
  };

  paymentMethods = [
    {
      value: 'CreditCard',
      label: 'Cartão de crédito',
    },
    {
      value: 'DebitCard',
      label: 'Cartão de débito',
    },
    {
      value: 'Cash',
      label: 'Dinheiro',
    },
    {
      value: 'Installments',
      label: 'Fiado',
    },
    {
      value: 'Pix',
      label: 'Pix',
    },
  ];

  // VARIÁVEIS DE CLIENTE
  clientFormControl = new FormControl('');
  client: Client = {
    name: '',
    idCompanys: localStorage.getItem('idCompany') || '',
  };
  clients: Client[] = [];
  filteredClients!: Observable<Client[]>;
  pg = [
    'Cel',
    'Ten Cel',
    'Maj',
    'Cap',
    '1º Ten',
    '2º Ten',
    '1º Sgt',
    '2º Sgt',
    '3º Sgt',
    'Cb',
    'Sd EP',
    'Sd EV',
  ];
  squad = ['1º Esqd', '2º Esqd', '3º Esqd', 'Esqd C Ap', 'EM'];
  showCreateButton = false;

  //VARIVAEIS DE PROFISSIONAL
  teste: string = '';
  professional: User = {
    _id: '',
    email: '',
    name: '',
  };
  professionals: User[] = [];

  //VARIÁVEIS DE SERVIÇO
  separatorKeysCodes: number[] = [ENTER, COMMA];
  servicoCtrl = new FormControl('');
  filteredServicos!: Observable<Servico[]>;
  selectedServicos: Servico[] = [];
  servicos: Servico[] = [];
  @ViewChild('servicoInput') servicoInput!: ElementRef<HTMLInputElement>;

  constructor(
    private clientService: ClientService,
    private servicoService: ServicoService,
    private userService: UserService,
    private serviceExecutedService: ServiceExecutedService,
    private reloadService: ReloadService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.filteredClients = this.clientFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.clientService.load().subscribe((clients) => {
      this.clients = clients;
    });

    this.filteredServicos = this.servicoCtrl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterService(value || ''))
    );
    this.servicoService.load().subscribe((servicos) => {
      this.servicos = servicos;
    });

    this.userService.getByIdCompany().subscribe((users) => {
      this.professionals = users;
    });

    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
  }

  reload() {
    this.clientService.load().subscribe((clients) => {
      this.clients = clients;
    });

    this.servicoService.load().subscribe((servicos) => {
      this.servicos = servicos;
    });

    this.userService.getByIdCompany().subscribe((users) => {
      this.professionals = users;
    });
  }

  private _filter(value: string): Client[] {
    const filterValue = value.toLowerCase();

    return this.clients.filter((client) =>
      client.name.toLowerCase().includes(filterValue)
    );
  }

  clienteSelecionado(event: MatAutocompleteSelectedEvent) {
    const clienteSelecionado = this.clients.find(
      (client) => client.name === event.option.value
    );
    if (clienteSelecionado) {
      this.client = clienteSelecionado;
      this.showCreateButton = false;
    } else {
      this.showCreateButton = true;
    }
  }

  professionalSelected(event: MatAutocompleteSelectedEvent) {
    const professionalSelecionado = this.professionals.find(
      (professional) => professional.name === event.option.value
    );
    if (professionalSelecionado) {
      this.professional = professionalSelecionado;
    }
  }

  checkExistingClient() {
    const enteredName = this.clientFormControl.value?.toLowerCase() || '';
    const existingClient = this.clients.find(
      (client) => client.name.toLowerCase() === enteredName
    );
    this.showCreateButton = !existingClient;
  }

  criarCliente(event: Event) {
    event.preventDefault();
    const nomeCliente = this.clientFormControl.value;

    // Criar um novo cliente com o nome fornecido
    this.client.name = nomeCliente as string;

    // Chamar o serviço para salvar o novo cliente no banco
    this.clientService.create(this.client).subscribe(
      (result) => {
        // Lógica após a criação do cliente no banco
        this.clients.push(result);
        this.client = result;
        this.showCreateButton = false;
        this.serviceExecutedService.showMessage('Cliente criado com sucesso!');
      },
      (error) => {
        this.serviceExecutedService.showMessage(error.error.message);
      }
    );
  }

  remove(servico: Servico): void {
    const index = this.selectedServicos.indexOf(servico);

    if (index >= 0) {
      this.selectedServicos.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const servicoSelected = this.servicos.find(
      (servico) => servico.name === event.option.value
    );
    if (servicoSelected) {
      this.selectedServicos.push(servicoSelected);
    }
    this.servicoInput.nativeElement.value = '';
    this.servicoCtrl.setValue(null);
  }

  private _filterService(value: string): Servico[] {
    const filterValue = value.toLowerCase();
    return this.servicos.filter((servico) =>
      servico.name.toLowerCase().includes(filterValue)
    );
  }

  value(): number {
    return this.selectedServicos.reduce(
      (acumulator, servico) => (servico.price as number) + acumulator,
      0
    );
  }

  cancel(): void {}

  salvar(event: Event): void {
    event.preventDefault();
    this.serviceExecuted.idClients = this.client._id;
    this.selectedServicos.map((servico) => {
      this.serviceExecuted.idServices?.push(servico._id as string);
    });
    this.serviceExecuted.idUsers = this.professional.id;

    this.serviceExecutedService.create(this.serviceExecuted).subscribe(
      (result) => {
        this.serviceExecutedService.showMessage('Serviço criado com sucesso');
        this.serviceExecuted = {
          _id: '',
          idCompanys: localStorage.getItem('idCompany') || '',
          idServices: [],
          idClients: '',
          serviceDate: new Date(),
          paymentDate: new Date(),
        };
        this.client = {
          name: '',
          idCompanys: localStorage.getItem('idCompany') || '',
        };
        this.selectedServicos = [];
        this.reloadService.reloadParent();
      },
      (error) => {
        this.serviceExecutedService.showMessage(error.error.message);
      }
    );
  }
}
