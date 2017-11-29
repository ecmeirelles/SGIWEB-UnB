import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login.component';
import { NoContentComponent } from '../no-content/no-content.component';
import { LoginService } from '../services/login.service';
import { Validation } from '../services/validation.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent, NoContentComponent ],
      imports: [
        FormsModule,
        TextMaskModule,
        MaterialModule,
        HttpModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [LoginService, Validation],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render a title', async(() => {
    const notice = fixture.debugElement.query(By.css('.login-form--title'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Sistema de Gestão Patrimonial');
  }));

  it('should render a form', async(() => {
    const notice = fixture.debugElement.query(By.css('.login-form--form'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader).toBeTruthy();
  }));

  it('should render a CPF field', async(() => {
    const notice = fixture.debugElement.query(By.css('#registration_cpf'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader).toBeTruthy();
  }));

  it('should render a CNPJ field', async(() => {
    const notice = fixture.debugElement.query(By.css('#registration_cnpj'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader).toBeTruthy();
  }));

  it('should render a clean button', async(() => {
    const notice = fixture.debugElement.query(By.css('.btn-clear'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Limpar');
  }));

  it('should render a submit button', async(() => {
    const notice = fixture.debugElement.query(By.css('.btn-search'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Pesquisar');
  }));
});
