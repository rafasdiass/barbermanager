import { startWith } from 'rxjs/operators';
import { Observable, map } from 'rxjs';
import { Component, ViewChild } from '@angular/core';
import { Client } from '../../client/client.model';
import { FormControl } from '@angular/forms';
import { ClientService } from '../../client/client.service';
import { ServiceExecutedService } from '../../service-executed/service-executed.service';
import { ReloadService } from 'src/app/services/reload.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ServiceExecuted } from '../../service-executed/serviceExecuted.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUpdateComponent } from '../../service-executed/dialog-update/dialog-update.component';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-client-report',
  templateUrl: './client-report.component.html',
  styleUrls: ['./client-report.component.scss'],
})
export class ClientReportComponent {
  servicesExecuteds: ServiceExecuted[] = [];
  isMobile = false;
  isLoading = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns = [
    'name',
    'value',
    'serviceDate',
    'paymentMethod',
    'paymentDate',
    'action',
  ];
  displayedColumnsMobile = ['name', 'value', 'paymentMethod', 'action'];
  clientFormControl = new FormControl('');
  client: Client = {
    name: '',
    idCompanys: localStorage.getItem('idCompany') || '',
  };
  clients: Client[] = [];
  filteredClients!: Observable<Client[]>;
  dataSource!: MatTableDataSource<ServiceExecuted>;

  constructor(
    private clientService: ClientService,
    private serviceExecuteService: ServiceExecutedService,
    private reloadService: ReloadService,
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filteredClients = this.clientFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    this.clientService.load().subscribe((clients) => {
      this.clients = clients;
    });

    this.reloadService.reloadParent$.subscribe(() => {
      this.loadServicesExecuteds();
    });

    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    // this.serviceExecuteService.load().subscribe((serviceExecuteds) => {
    //   this.servicesExecuteds = serviceExecuteds;
    //   this.dataSource = new MatTableDataSource(serviceExecuteds);
    // });
  }

  loadServicesExecuteds() {
    this.isLoading = true;
    this.serviceExecuteService
      .getByClient(this.client._id as string)
      .subscribe((servicesExecuteds) => {
        this.servicesExecuteds = servicesExecuteds.sort((a, b) => {
          const dateA = new Date(a.serviceDate);
          const dateB = new Date(b.serviceDate);
          return dateB.getTime() - dateA.getTime();
        });
        this.dataSource = new MatTableDataSource(this.servicesExecuteds);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortData;
      });

    this.clientService.getById(this.client._id as string).subscribe((user) => {
      this.client = user;
      this.isLoading = false;
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
      this.loadServicesExecuteds();
    }
  }

  delete(id: string): void {
    const r = confirm(`Tem certeza que deseja excluir?`);
    if (r) {
      this.serviceExecuteService.deleteById(id).subscribe(
        () => {
          this.serviceExecuteService.showMessage('Serviço deletado!');
          this.reloadService.reloadParent();
        },
        (error) => {
          this.serviceExecuteService.showMessage(error.error.message);
        }
      );
    }
  }

  openDialog(id: string): void {
    let serviceExecuted: ServiceExecuted;
    this.serviceExecuteService.getById(id).subscribe((service) => {
      serviceExecuted = service;

      const dialogRef = this.dialog.open(DialogUpdateComponent, {
        data: {
          paymentMethod: serviceExecuted.paymentMethod,
          paymentDate: serviceExecuted.paymentDate,
          _id: serviceExecuted.id,
          idClients: serviceExecuted.client?._id,
        },
      });

      dialogRef.afterClosed().subscribe((result) => {});
    });
  }

  getRowClass(row: any): string {
    if (row.paymentMethod === 'Installments') {
      return 'high-value-row';
    } else {
      return 'normal-value-row';
    }
  }
}
