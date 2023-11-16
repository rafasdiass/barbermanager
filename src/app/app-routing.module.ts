import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CompanyComponent } from './components/company/company/company.component';
import { ServicoComponent } from './components/servicos/servico/servico.component';
import { CostComponent } from './components/balance/cost/cost/cost.component';
import { BalanceComponent } from './components/balance/balance-home/balance.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardLogin } from './guards/auth-login.guard';
import { ClientHomeComponent } from './components/client/client-home/client.component';
import { HomeComponent } from './components/home/home/home.component';
import { SelectedCompanyGuard } from './guards/selected-company.guard';
import { ServiceExecutedHomeComponent } from './components/service-executed/service-executed-home/service-executed-home.component';
import { ClientReportComponent } from './components/reporting/client-report/client-report.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceExecutedHomeComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'selectcompany',
    component: HomeComponent,
    canActivate: [AuthGuardLogin],
  },
  {
    path: 'company',
    component: CompanyComponent,
    canActivate: [AuthGuardLogin],
  },
  {
    path: 'client',
    component: ClientHomeComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'service',
    component: ServicoComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'balance',
    component: BalanceComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'cost',
    component: CostComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'reporting/clients',
    component: ClientReportComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'employee',
    component: EmployeeComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'employee/create',
    component: EmployeeCreateComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'employee/update/:id',
    component: EmployeeUpdateComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'employee/delete/:id',
    component: EmployeeDeleteComponent,
    canActivate: [SelectedCompanyGuard, AuthGuardLogin],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
