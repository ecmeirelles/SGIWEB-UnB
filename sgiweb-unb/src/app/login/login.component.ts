import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {FormControl, FormGroupDirective, NgForm, } from "@angular/forms";
import {ErrorStateMatcher} from "@angular/material";

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

  private isCPF_Empty = true;
  private isCNPJ_Empty = true;
  private isBothEmpty = true;

  private submitError = false;
  private errorMessage = '';

  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(
    //Dependencies
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  setEmptyCPF(value) {
    this.isCPF_Empty = value;
    this.isBothEmpty = value;

    if (value === false) {
      this.submitError = false;
    }
  }

  setEmptyCNPJ(value) {
    this.isCNPJ_Empty = value;
     this.isBothEmpty = value;

     if (value === false) {
      this.submitError = false;
    }
  }

  search() {
    if(this.login.registration === undefined || this.login.registration === '' || this.login.registration === null) {
      this.submitError = true;
      this.errorMessage = 'Preencha o formulário com seu CPF ou CNPJ';
    } else if(!this.isBothEmpty && this.isValidCPF && this.isValidCNPJ) {
      // let registration = this.login.registration.replace(/[^\d]+/g,'');
      // let result = this.loginService.searchBankSlips(registration);
      //result.subscribe(data => this.router.navigate(["/"]));
    }
  }

  reset() {
    this.login.registration = '';
    this.setEmptyCPF(true);
    this.setEmptyCNPJ(true);
  }

  CPF_Error: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return !this.isValidCPF;
    }
  };

  CNPJ_Error: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return !this.isValidCNPJ;
    }
  };

  // @Copyright to http://www.devmedia.com.br/validar-cpf-com-javascript/23916
  validateCPF(strCPF) {
    this.isValidCPF = true;

    // Do not pass through the function if CPF number is equal to null
    if (strCPF !== null) {
      // Removing everything which is not number
      strCPF = strCPF.replace(/[^\d]+/g,'');

      if(strCPF.length === 0) {
        this.setEmptyCPF(true);
      } else {
        this.setEmptyCPF(false);

        let sum = 0;
        let remainder = 0;

        if (strCPF === "00000000000" || strCPF === "11111111111" ||
            strCPF === "22222222222" || strCPF === "33333333333" ||
            strCPF === "44444444444" || strCPF === "55555555555" ||
            strCPF === "66666666666" || strCPF === "77777777777" ||
            strCPF === "88888888888" || strCPF === "99999999999") {
          this.isValidCPF = false;
        }

        for (let i = 1; i <= 9; i++) {
          sum = sum + parseInt(strCPF.substring(i-1, i)) * (11 - i);
        }

        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
          remainder = 0;
        }
        if (remainder !== parseInt(strCPF.substring(9, 10))) {
          this.isValidCPF = false;
        }

        sum = 0;
        for (let j = 1; j <= 10; j++) {
          sum = sum + parseInt(strCPF.substring(j-1, j)) * (12 - j);
        }

        remainder = (sum * 10) % 11;
        if ((remainder === 10) || (remainder === 11)) {
          remainder = 0;
        }
        if (remainder !== parseInt(strCPF.substring(10, 11))) {
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

      if(strCNPJ.length === 0) {
        this.setEmptyCNPJ(true);
      } else {
        this.setEmptyCNPJ(false);

        if (strCNPJ === "00000000000000" || strCNPJ === "11111111111111" ||
          strCNPJ === "22222222222222" || strCNPJ === "33333333333333" ||
          strCNPJ === "44444444444444" || strCNPJ === "55555555555555" ||
          strCNPJ === "66666666666666" || strCNPJ === "77777777777777" ||
          strCNPJ === "88888888888888" || strCNPJ === "99999999999999") {
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
