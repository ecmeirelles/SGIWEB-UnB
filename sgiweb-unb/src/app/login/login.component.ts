import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/login.service';
import {Login} from "./shared/login";
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  login: Login = new Login();

  constructor(
    //Dependencies
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() { }

  save() {
    var result = this.loginService.authenticate(this.login);
    result.subscribe(data => this.router.navigate(['/']));
  }
}
