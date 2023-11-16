import { Component, ViewChild } from '@angular/core';
import { ServiceExecuted } from '../serviceExecuted.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReloadService } from 'src/app/services/reload.service';
import { ServiceExecutedService } from '../service-executed.service';
import { MatTableDataSource } from '@angular/material/table';
import { DialogUpdateComponent } from '../dialog-update/dialog-update.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceExecutedCreate } from '../serviceExecutedCreate.model';
import { MatPaginator } from '@angular/material/paginator';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-service-executed-read',
  templateUrl: './service-executed-read.component.html',
  styleUrls: ['./service-executed-read.component.scss'],
})
export class ServiceExecutedReadComponent {
  servicesExecuteds: ServiceExecuted[] = [];
  isMobile = false;
  isLoading = false;

  displayedColumns = [
    'name',
    'value',
    'serviceDate',
    'paymentMethod',
    'paymentDate',
    'action',
  ];
  displayedColumnsMobile = ['name', 'value', 'paymentMethod', 'action'];

  dataSource!: MatTableDataSource<ServiceExecuted>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private reloadService: ReloadService,
    private serviceExecuteService: ServiceExecutedService,
    private dialog: MatDialog
  ) {}

  animal: string = '';
  name: string = '';

  ngOnInit(): void {
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .subscribe((result) => {
        this.isMobile = result.matches;
      });

    this.serviceExecuteService.load().subscribe((serviceExecuteds) => {
      this.servicesExecuteds = serviceExecuteds.sort((a, b) => {
        const dateA = new Date(a.serviceDate);
        const dateB = new Date(b.serviceDate);
        return dateB.getTime() - dateA.getTime();
      });
      this.dataSource = new MatTableDataSource(this.servicesExecuteds);
      this.dataSource.paginator = this.paginator;
    });

    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
  }

  reload(): void {
    this.serviceExecuteService.load().subscribe((serviceExecuteds) => {
      this.servicesExecuteds = serviceExecuteds.sort((a, b) => {
        const dateA = new Date(a.serviceDate);
        const dateB = new Date(b.serviceDate);
        return dateB.getTime() - dateA.getTime();
      });
      this.dataSource = new MatTableDataSource(this.servicesExecuteds);
      this.dataSource.paginator = this.paginator;
    });
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

  edit(id: string): void {}

  delete(id: string): void {
    const r = confirm(`Tem certeza que deseja excluir?`);
    if (r) {
      this.serviceExecuteService.deleteById(id).subscribe(() => {
        this.serviceExecuteService.showMessage('Serviço deletado!');
        this.reloadService.reloadParent();
      });
    }
  }
}
