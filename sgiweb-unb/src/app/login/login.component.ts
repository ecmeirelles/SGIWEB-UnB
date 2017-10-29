import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { FormControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material";

import { LoginService } from "../services/login.service";
import { Validation } from '../services/validation.service';
import { Login } from "./shared/login";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  ngOnInit() { }
  login: Login = new Login();
  //isValid
  private isValidCPF: boolean = true;
  private isValidCNPJ: boolean = true;
  //isEmpty
  private isEmptyCPF: boolean = true;
  private isEmptyCNPJ: boolean = true;
  private isBothEmpty: boolean = true;
  //Errors
  private submitError: boolean = false;
  private errorMessage: string = '';
  private noContent: boolean = false;
  //Masks
  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(
    //Dependencies
    private loginService: LoginService,
    private validation: Validation,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ErrorCPF: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return !this.isValidCPF;
    }
  };

  ErrorCNPJ: ErrorStateMatcher = {
    isErrorState: (control: FormControl) => {
      return !this.isValidCNPJ;
    }
  };

  setEmptyCPF(value): void {
    this.isEmptyCPF = value;
    this.isBothEmpty = value;
    this.submitError = false;
    this.isValidCPF = true;
  }

  setEmptyCNPJ(value): void {
    this.isEmptyCNPJ = value;
    this.isBothEmpty = value;
    this.submitError = false;
    this.isValidCNPJ = true;
  }

  validateCPF(cpf): void {
    if(!!cpf) {
      this.setEmptyCPF(cpf.replace(/[^\d]+/g,'').length === 0);
      this.isValidCPF = this.validation.validateCPF(cpf);
    }
  }

  validateCNPJ(cnpj): void {
    if(!!cnpj) {
      this.setEmptyCNPJ(cnpj.replace(/[^\d]+/g,'').length === 0);
      this.isValidCNPJ = this.validation.validateCNPJ(cnpj);
    }
  }

  reset(): void {
    this.login.registration = '';
    this.noContent = false;
    this.setEmptyCPF(true);
    this.setEmptyCNPJ(true);
  }

  async search() {
    let result: any;

    if(this.login.registration === undefined || this.login.registration === null || this.login.registration.length === 0) {
      this.submitError = true;
      this.errorMessage = 'Preencha o formulário com seu CPF ou CNPJ';
    }

    else if(!this.isBothEmpty && this.isValidCPF && this.isValidCNPJ) {
      const registration = this.login.registration.replace(/[^\d]+/g,'');
      result = await this.loginService.searchByRegistration(registration);

      this.noContent = result.renters.length === 0;
      if(result.renters.length > 0) {
        this.router.navigate(['/', registration]);
      }
    }
  }
}
