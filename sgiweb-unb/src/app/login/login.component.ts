import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {FormControl, FormGroupDirective, NgForm} from "@angular/forms";

import { LoginService } from "./shared/login.service";
import {Login} from "./shared/login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  ngOnInit() { }
  login: Login = new Login();

  private isValidCPF = true;
  private isValidCNPJ = true;

  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(
    //Dependencies
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  CPF_Error = (control: FormControl, form: FormGroupDirective | NgForm): boolean => {
    return !this.isValidCPF;
  }

  CNPJ_Error = (control: FormControl, form: FormGroupDirective | NgForm): boolean => {
    return !this.isValidCNPJ;
  }

  search() {
    let result = this.loginService.authenticate(this.login);
    result.subscribe(data => this.router.navigate(["/"]));
  }

  reset() {
    this.login.cpf = "";
    this.login.cnpj = "";
  }

  // @Copyright to http://www.devmedia.com.br/validar-cpf-com-javascript/23916
  validateCPF(strCPF) {
    this.isValidCPF = true;

    // Do not pass through the function if CPF number is equal to null
    if (strCPF !== null) {
      // Removing everything which is not number
      strCPF = strCPF.replace(/[^\d]+/g,'');
      // Validating just if user has typed all 11 numbers
      if (strCPF.length === 11) {
        let sum = 0;
        let remainder = 0;

        if (strCPF == "00000000000") {
          this.isValidCPF = false;
        }

        for (let i = 1; i <= 9; i++) {
          sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if ((remainder == 10) || (remainder == 11)) {
          remainder = 0;
        }
        if (remainder != parseInt(strCPF.substring(9, 10))) {
          this.isValidCPF = false;
        }

        sum = 0;
        for (let j = 1; j <= 10; j++) {
          sum = sum + parseInt(strCPF.substring(j-1, j)) * (12 - j);
        }

        remainder = (sum * 10) % 11;
        if ((remainder == 10) || (remainder == 11)) {
          remainder = 0;
        }
        if (remainder != parseInt(strCPF.substring(10, 11))) {
          this.isValidCPF = false;
        }
      }
    }
    return this.isValidCPF;
  }

  // @Copyright to http://www.geradorcnpj.com/javascript-validar-cnpj.htm
  validateCNPJ(strCNPJ) {
    this.isValidCNPJ = true;

    // Do not pass through the function if CNPJ number is equal to null
    if(strCNPJ !== null) {
      // Removing everything which is not number
      strCNPJ = strCNPJ.replace(/[^\d]+/g,'');
      // Validating just if user has typed all 14 numbers
      if (strCNPJ.length === 14) {

        if (strCNPJ == "00000000000000") {
          this.isValidCNPJ = false;
        }

        let length = strCNPJ.length - 2
        let numbers = strCNPJ.substring(0,length);
        let digits = strCNPJ.substring(length);
        let sum = 0;
        let position = length - 7;

        for (let i = length; i >= 1; i--) {
          sum += numbers.charAt(length - i) * position--;
          if (position < 2) {
            position = 9;
          }
        }

        let result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(0)) {
          this.isValidCNPJ = false;
        }

        length = length + 1;
        numbers = strCNPJ.substring(0,length);
        sum = 0;
        position = length - 7;

        for (let j = length; j >= 1; j--) {
          sum += numbers.charAt(length - j) * position--;
          if (position < 2) {
            position = 9;
          }
        }

        result = sum % 11 < 2 ? 0 : 11 - sum % 11;
        if (result != digits.charAt(1)){
          this.isValidCNPJ = false;
        }
      }
    }

    return this.isValidCNPJ;
  }
}
