import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

import { LoginService } from './shared/login.service';
import {Login} from "./shared/login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  ngOnInit() { }
  login: Login = new Login();

  constructor(
    //Dependencies
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  registrationFormControl = new FormControl('', [
    Validators.required
  ]);

  save() {
    var result = this.loginService.authenticate(this.login);
    result.subscribe(data => this.router.navigate(['/']));
  }
}
