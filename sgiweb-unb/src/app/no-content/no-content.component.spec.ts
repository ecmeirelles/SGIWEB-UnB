import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoContentComponent } from './no-content.component';

describe('NoContentComponent', () => {
  let component: NoContentComponent;
  let fixture: ComponentFixture<NoContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render no content message', async(() => {
    const message = fixture.debugElement.query(By.css('.noContent--response__name'));
    const mainHeader = message.nativeElement;

    expect(mainHeader.textContent).toContain('Não há resultados encontrados para a busca');
  }));

  it('should render an observation sentence', async(() => {
    const notice = fixture.debugElement.query(By.css('.noContent--notice_info'));
    const mainHeader = notice.nativeElement;

    expect(mainHeader.textContent).toContain('Caso o boleto não seja exibido entre em contato com a S.G.P pelo telefone');
  }));
});
