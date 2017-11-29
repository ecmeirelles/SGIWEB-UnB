import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';
import { By } from '@angular/platform-browser';
import { LoginService } from '../services/login.service';

import { DetailsComponent } from './details.component';

describe('DetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsComponent ],
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      providers: [LoginService],
    }).compileComponents();

    this.fixture = TestBed.createComponent(DetailsComponent);
    this.app = this.fixture.debugElement.componentInstance;
  }));

  it('should be created', () => {
    expect(this.app).toBeTruthy();
  });

  it('should render the name of renter', async(() => {
    const notice = this.fixture.debugElement.query(By.css('.details--renter__name'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Inquilino');
  }));

  it('should render an observation sentence', async(() => {
    const notice = this.fixture.debugElement.query(By.css('.details--notice_info'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Caso o boleto não seja exibido entre em contato com a S.G.P pelo telefone');
  }));

  it('should render the main slip bank card', async(() => {
    const notice = this.fixture.debugElement.query(By.css('.details__renter--info'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader).toBeTruthy();
  }));
});
