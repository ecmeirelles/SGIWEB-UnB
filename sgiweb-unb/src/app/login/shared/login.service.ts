import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
  public apiHost: string = './../assets/data/data.json';
  constructor(private http: Http) { }

  public getAll(): Promise<Object> {
    return this.http.get(this.apiHost)
      .toPromise()
      .then((response) => {
        return response.json();
      }).catch((err) => {
      console.log(err);
    });
  }

  public searchByRegistration(registration): Promise<void> {
    return this.http.get(this.apiHost)
      .toPromise()
      .then((response) => {
        var results = [];
        const res = response.json().renters;
        for (var i = 0; i < res.length; i++) {
          if ((res)[i].registration == registration) {
            results.push(res[i]);
          }
        }
        return {renters: results};
      }).catch((err) => {
      console.log(err);
    });
  }
}
