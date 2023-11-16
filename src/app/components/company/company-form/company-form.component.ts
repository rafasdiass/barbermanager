import { Component, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { Company } from '../company.model';
import { Router } from '@angular/router';
import { CompanyService } from '../company.service';
import { ReloadService } from '../../../services/reload.service';
import { CepService } from 'src/app/services/cep.service';
import { ReloadNavService } from 'src/app/services/reloadNav.service';

@Component({
  selector: 'app-company-form',
  templateUrl: './company-form.component.html',
  styleUrls: ['./company-form.component.scss'],
})
export class CompanyFormComponent {
  constructor(
    private router: Router,
    public cepService: CepService,
    public companyService: CompanyService,
    private reloadService: ReloadService,
    private reloadNavService: ReloadNavService
  ) {}

  ngOnInit() {
    this.cepControl.valueChanges.subscribe((cep) => {
      if (cep && cep.length === 8) {
        // Verifica se o CEP possui 8 dígitos
        this.cepService.getAddressByCEP(cep).subscribe((data) => {
          this.logradouro = data.logradouro;
          this.bairro = data.bairro;
          this.cep = data.cep;
          this.city = data.localidade;
        });
      }
    });
    this.reloadService.reloadParent$.subscribe(() => {
      this.reload();
    });
  }

  ngAfterViewInit(): void {
    this.reloadService.reloadParent();
  }

  reload(): void {
    this.company = this.companyService.company;
  }

  company: Company = {
    name: '',
    address: '',
    phone: '',
  };

  cepControl = new FormControl();
  cep: string = '';
  logradouro: string = '';
  bairro: string = '';
  city: string = '';
  numero: number = 0;

  submit(event: Event): void {
    event.preventDefault();

    if (!this.companyService.isEdit && !this.companyService.isDelete) {
      this.company.address = `${this.logradouro}, ${this.bairro}, ${this.numero}, ${this.cep}, ${this.city}`;
      this.company.phone = this.companyService.formatPhoneNumber(
        this.company.phone
      );
      this.companyService.create(this.company).subscribe(
        (company) => {
          this.companyService.showMessage(
            `Empresa: ${company.name} criada com sucesso!`
          );
          this.reloadService.reloadParent();
          this.reloadNavService.update();
        },
        (error) => {
          this.companyService.showMessage(error.error.message);
        }
      );
    } else if (this.companyService.isEdit && !this.companyService.isDelete) {
      this.company.phone = this.companyService.unformatPhoneNumber(
        this.company.phone
      );
      this.company.phone = this.companyService.formatPhoneNumber(
        this.company.phone
      );
      this.companyService.update(this.company).subscribe(
        (data) => {
          this.companyService.showMessage(`Empresa alterada com sucesso!`);
          this.reloadNavService.update();
          this.reloadService.reloadParent();
        },
        (error) => {
          this.companyService.showMessage(error.error.message);
        }
      );
    } else if (this.companyService.isDelete) {
      this.companyService.delete(this.company._id as string).subscribe(
        (company) => {
          this.companyService.showMessage('Empresa excluida!');
          this.reloadNavService.update();
          this.reloadService.reloadParent();
        },
        (error) => {
          this.companyService.showMessage(error.error.message);
        }
      );
    }
    this.cancel();
  }

  cancel(): void {
    this.cep = '';
    this.cepControl = new FormControl();
    this.logradouro = '';
    this.bairro = '';
    this.numero = 0;
    this.companyService.isDelete = false;
    this.companyService.isEdit = false;
    this.companyService.company = {
      name: '',
      address: '',
      phone: '',
    };
    this.reloadService.reloadParent();
  }
}
