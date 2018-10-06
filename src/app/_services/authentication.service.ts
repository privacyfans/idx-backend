import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }
//,{responseType: 'text' as 'json'}
private httpOption = {
    headers: new HttpHeaders({
      'Accept': 'text/html, application/xhtml+xml, */*',
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    responseType: 'text'
  };
    login(Name: string, Password: string) {
        return this.http.post(`${environment.apiUrl}/signin`, { Name: Name, Password: Password },{responseType: 'text'})
            .pipe(map(user => {
               
                // login successful if there's a jwt token in the response
                if (user) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('currentUser', user);
                    localStorage.setItem('Name', Name);
                }
                console.log('user:'+localStorage.getItem('currentUser'));
                console.log('Name:'+localStorage.getItem('Name'));
                return user;
                
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}