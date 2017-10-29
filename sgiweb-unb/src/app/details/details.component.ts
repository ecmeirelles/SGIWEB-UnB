import StringMask from 'string-mask';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})

export class DetailsComponent implements OnInit {
  private subscription: any;
  private serviceData: any;
  private registration: string = '';
  private renter: Array<Object> = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) { }

  async ngOnInit() {
    this.subscription = this.route.params.subscribe(async params => {
      if(params['registration'].length === 11) {
        this.registration = this.maskCPF(params['registration']);
      } else if(params['registration'].length === 14) {
        this.registration = this.maskCNPJ(params['registration']);
      } else {
        this.registration = 'CPF ou CNPJ inválido';
      }
    });

    this.serviceData = await this.loginService.searchByRegistration(this.registration.replace(/[^\d]+/g,''));
    this.renter = this.serviceData.renters[0];

    if(this.serviceData.renters.length === 0) {
      this.goBack();
    }
  }

  goBack(): void {
    this.router.navigate(['/']);
  }

  maskCPF(cpf): string {
    var formatter = new StringMask('000.000.000-00');
    var result = formatter.apply(cpf);

    return result;
  }

  maskCNPJ(cnpj): string {
    var formatter = new StringMask('00.000.000/0000-00');
    var result = formatter.apply(cnpj);

    return result;
  }
}
