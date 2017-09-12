import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

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

  public cpfMask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
  public cnpjMask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]

  constructor(
    //Dependencies
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  search() {
    var result = this.loginService.authenticate(this.login);
    result.subscribe(data => this.router.navigate(["/"]));
  }

  reset() {
    this.login.cpf = "";
    this.login.cnpj = "";
  }
}
