import { Component, Input } from '@angular/core';
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {

  constructor(private http: Http) {

  }

  public searchBankSlips(registration): Observable<any> {
    return this.http.get("./sgiweb.json")
                    .map((res:any) => res.json())
                    .catch((error:any) => {
                      console.log(error);
                      return Observable.of(undefined);
                    });

  }
}
