import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [ RouterTestingModule ],
    }).compileComponents();

    this.fixture = TestBed.createComponent(AppComponent);
    this.app = this.fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(this.app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    expect(this.app.title).toEqual('app');
  }));

  it('should render a topbar', async(() => {
    const topbar = this.fixture.debugElement.query(By.css('.main-header'));
    const mainHeader = topbar.nativeElement;

    expect(mainHeader.textContent).toContain('Sistema de Gerenciamento de Imóveis');
  }));
});
