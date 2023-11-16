import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { UserService } from './../../../services/user.service';
import { CompanyService } from '../../company/company.service';
import { Router } from '@angular/router';
import { ReloadNavService } from 'src/app/services/reloadNav.service';
import { of } from 'rxjs';
import { Company } from './../../company/company.model';
import { User } from './../../../models/user.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: jasmine.SpyObj<UserService>;
  let companyService: jasmine.SpyObj<CompanyService>;
  let router: jasmine.SpyObj<Router>;
  let reloadNavService: jasmine.SpyObj<ReloadNavService>;

  beforeEach(() => {
    const userServiceSpy = jasmine.createSpyObj('UserService', ['getById']);
    const companyServiceSpy = jasmine.createSpyObj('CompanyService', ['getById']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const reloadNavServiceSpy = jasmine.createSpyObj('ReloadNavService', ['update']);

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: CompanyService, useValue: companyServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ReloadNavService, useValue: reloadNavServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    companyService = TestBed.inject(CompanyService) as jasmine.SpyObj<CompanyService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    reloadNavService = TestBed.inject(ReloadNavService) as jasmine.SpyObj<ReloadNavService>;

    // Mocking localStorage
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: () => '1', // Mocking the idUser value
        setItem: () => {}
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user companies and sort them', () => {
    const userId = '1';
    const user: User = {
      id: userId,
      idCompanys: ['2', '1', '3'], // Example company IDs
      email: '',
      password: ''
    };
    const companies: Company[] = [
      { id: '1', name: 'Company A', address: '', phone: '' },
      { id: '2', name: 'Company B', address: '', phone: '' },
      { id: '3', name: 'Company C', address: '', phone: '' }
    ];

    userService.getById.and.returnValue(of(user));
    companyService.getById.and.callFake((id: string) => {
      const company = companies.find(c => c.id === id);
      return of(company !== undefined ? company : ({} as Company));
    });


    component.ngOnInit();

    expect(userService.getById).toHaveBeenCalledWith(userId);
    expect(companyService.getById).toHaveBeenCalledTimes(3);
    expect(component.companies).toEqual(companies);
    expect(component.companies[0].name).toBe('Company A');
    expect(component.companies[1].name).toBe('Company B');
    expect(component.companies[2].name).toBe('Company C');
    expect(component.selectedCompany).toBe(component.companies[0]);
  });

  it('should select a company', () => {
    const company: Company = {
      id: '1',
      name: 'Company A',
      address: '',
      phone: ''
    };

    component.selectCompany(company);

    expect(component.selectedCompany).toBe(company);
  });

  it('should switch to a company', () => {
    const companyId = '1';

    component.switchCompany(companyId);
    expect(localStorage.setItem).toHaveBeenCalledWith('idCompany', companyId);
    expect(reloadNavService.update).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
