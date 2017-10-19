import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import StringMask from 'string-mask';

import { LoginService } from '../login/shared/login.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  private registration = '';
  private renter = [];
  private sub: any;
  private serviceData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private loginService: LoginService
  ) { }

  async ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if(params['registration'].length === 11) {
        this.registration = this.maskCPF(params['registration']);
      } else {
        this.registration = this.maskCNPJ(params['registration']);
      }
    });

    this.serviceData = await this.loginService.getAll();
    this.renter = this.serviceData.renters[0];
    console.log(this.renter);
  }

  goBack() {
    this.router.navigate(['/']);
  }

  maskCPF(str) {
    var formatter = new StringMask('000.000.000-00');
    var result = formatter.apply(str);

    return result;
  }

  maskCNPJ(str) {
    var formatter = new StringMask('00.000.000/0000-00');
    var result = formatter.apply(str);

    return result;
  }
}
