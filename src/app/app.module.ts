import { NgModule } from '@angular/core';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/template/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { A11yModule } from '@angular/cdk/a11y';
import { BidiModule } from '@angular/cdk/bidi';
import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { FormsModule } from '@angular/forms';

//Angular Material Components
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { FooterComponent } from './components/template/footer/footer.component';
import { NavComponent } from './components/template/nav/nav.component';
import { NavService } from './components/template/nav/nav.service';
import { CompanyComponent } from './components/company/company/company.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { CompanyReadComponent } from './components/company/company-read/company-read.component';
import { ServicoComponent } from './components/servicos/servico/servico.component';
import { ServicoCreateComponent } from './components/servicos/servico-create/servico-create.component';
import { ServicoUpdateComponent } from './components/servicos/servico-update/servico-update.component';
import { ServicoDeleteComponent } from './components/servicos/servico-delete/servico-delete.component';
import { ServicoReadComponent } from './components/servicos/servico-read/servico-read.component';

import { MatNativeDateModule } from '@angular/material/core';
import { ClientHomeComponent } from './components/client/client-home/client.component';
import { ClientReadComponent } from './components/client/client-read/client-read.component';
import { CostDeleteComponent } from './components/balance/cost/cost-delete/cost-delete.component';
import { CostUpdateComponent } from './components/balance/cost/cost-update/cost-update.component';
import { CostReadComponent } from './components/balance/cost/cost-read/cost-read.component';
import { CostCreateComponent } from './components/balance/cost/cost-create/cost-create.component';
import { CostComponent } from './components/balance/cost/cost/cost.component';
import { BalanceComponent } from './components/balance/balance-home/balance.component';
import { EmployeeComponent } from './components/employee/employee/employee.component';
import { EmployeeCreateComponent } from './components/employee/employee-create/employee-create.component';
import { EmployeeDeleteComponent } from './components/employee/employee-delete/employee-delete.component';
import { EmployeeReadComponent } from './components/employee/employee-read/employee-read.component';
import { EmployeeUpdateComponent } from './components/employee/employee-update/employee-update.component';
import { DatePipe, registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { LOCALE_ID } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { CompanyFormComponent } from './components/company/company-form/company-form.component';
import { ClientFormComponent } from './components/client/client-form/client-form.component';
import { HomeComponent } from './components/home/home/home.component';
import { EntryCreateComponent } from './components/balance/entry/entry-create/entry-create.component';
import { EntryDeleteComponent } from './components/balance/entry/entry-delete/entry-delete.component';
import { EntryReadComponent } from './components/balance/entry/entry-read/entry-read.component';
import { EntryUpdateComponent } from './components/balance/entry/entry-update/entry-update.component';
import { EntryComponent } from './components/balance/entry/entry/entry.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from './services/http-interceptor.service';
import { AuthService } from './services/auth.service';
import { ServiceExecutedHomeComponent } from './components/service-executed/service-executed-home/service-executed-home.component';
import { ServiceExecutedCreateComponent } from './components/service-executed/service-executed-create/service-executed-create.component';
import { ServiceExecutedReadComponent } from './components/service-executed/service-executed-read/service-executed-read.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogUpdateComponent } from './components/service-executed/dialog-update/dialog-update.component';
import { ClientReportComponent } from './components/reporting/client-report/client-report.component';
import { ReplaceTextPipe } from './pipes/replacetext.pipe';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavComponent,
    CompanyComponent,
    CompanyReadComponent,
    ServicoComponent,
    ServicoCreateComponent,
    ServicoUpdateComponent,
    ServicoDeleteComponent,
    ServicoReadComponent,
    CostReadComponent,
    CostCreateComponent,
    CostDeleteComponent,
    CostUpdateComponent,
    CostComponent,
    ClientHomeComponent,
    ClientReadComponent,
    BalanceComponent,
    EmployeeComponent,
    EmployeeCreateComponent,
    EmployeeDeleteComponent,
    EmployeeReadComponent,
    EmployeeUpdateComponent,
    LoginComponent,
    CompanyFormComponent,
    ClientFormComponent,
    HomeComponent,
    EntryComponent,
    EntryCreateComponent,
    EntryDeleteComponent,
    EntryReadComponent,
    EntryUpdateComponent,
    BalanceComponent,
    ServiceExecutedHomeComponent,
    ServiceExecutedCreateComponent,
    ServiceExecutedReadComponent,
    DialogUpdateComponent,
    ClientReportComponent,
    ReplaceTextPipe,
  ],
  imports: [
    BrowserModule,

    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    A11yModule,
    BidiModule,
    MatDividerModule,
    ObserversModule,
    OverlayModule,
    PlatformModule,
    PortalModule,
    CdkStepperModule,
    CdkTableModule,
    CdkTreeModule,
    NgxMaskModule.forRoot(),
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    // Material
    MatBadgeModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatMenuModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatToolbarModule,
  ],
  providers: [
    NavService,
    AuthService,
    DatePipe,
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
