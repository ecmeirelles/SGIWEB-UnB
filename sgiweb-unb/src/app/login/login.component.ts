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

  public isValidCPF = true;
  public isValidCNPJ = true;

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

  validateCPF(cpf) {
    this.isValidCPF = true;

    if(cpf !== null) {
      cpf = cpf.replace(/[^\d]+/g,'');

      if(cpf.length === 11) {
        let add = 0;
        let rev = 0;

        // Elimina CPFs invalidos conhecidos
        if (cpf === "00000000000" ||
          cpf === "11111111111" ||
          cpf === "22222222222" ||
          cpf === "33333333333" ||
          cpf === "44444444444" ||
          cpf === "55555555555" ||
          cpf === "66666666666" ||
          cpf === "77777777777" ||
          cpf === "88888888888" ||
          cpf === "99999999999")
            this.isValidCPF = false;

        // Valida 1o digito
        for (let i=0; i < 9; i ++)
          add += parseInt(cpf.charAt(i)) * (10 - i);
          rev = 11 - (add % 11);
          if (rev === 10 || rev === 11)
            rev = 0;
          if (rev != parseInt(cpf.charAt(9)))
            this.isValidCPF = false;

        // Valida 2o digito
        add = 0;
        for (let j = 0; j < 10; j ++)
          add += parseInt(cpf.charAt(j)) * (11 - j);

        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11)
          rev = 0;

        if (rev != parseInt(cpf.charAt(10)))
          this.isValidCPF = false;
      }
    }
    return this.isValidCPF;
  }

  validateCNPJ(cnpj) {
    this.isValidCNPJ = true;

    if(cnpj !== null) {
      cnpj = cnpj.replace(/[^\d]+/g,'');

      if (cnpj.length === 14) {
        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
              this.isValidCNPJ = false;

        // Valida DVs
        let tamanho = cnpj.length - 2
        let numeros = cnpj.substring(0,tamanho);
        let digitos = cnpj.substring(tamanho);
        let soma = 0;
        let pos = tamanho - 7;

        for (let i = tamanho; i >= 1; i--) {
          soma += numeros.charAt(tamanho - i) * pos--;
          if (pos < 2)
                pos = 9;
        }

        let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
          this.isValidCNPJ = false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0,tamanho);
        soma = 0;
        pos = tamanho - 7;

        for (let j = tamanho; j >= 1; j--) {
          soma += numeros.charAt(tamanho - j) * pos--;
          if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
          this.isValidCNPJ = false;
      }
    }

    return this.isValidCNPJ;
  }

  search() {
    var result = this.loginService.authenticate(this.login);
    result.subscribe(data => this.router.navigate(["/"]));
  }

  reset() {
    this.login.cpf = "";
    this.login.cnpj = "";
  }
}
