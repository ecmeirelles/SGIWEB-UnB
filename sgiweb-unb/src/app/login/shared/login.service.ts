import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class LoginService {

  // API URL
  private url: string = "http://localhost:3000/questions";

  constructor(private http: Http) { }

  // Authenticate the user
  authenticate(registration){
    return this.http.post(this.url, {'registration': registration})
      .map(res => res.json());
  }
}
