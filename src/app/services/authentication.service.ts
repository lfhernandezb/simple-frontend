import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ObservedValueOf, Subscribable, Subscription, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  httpOptions: any;
  private authenticated: boolean = false;
  //private userSubject: BehaviorSubject<User>;
  //public user: Observable<User | null>;
  // store the URL so we can redirect after logging in
  public redirectUrl: string | null = null;

  // initialises the userSubject with the user object from sessionStorage
  // which enables the user to stay logged in between page refreshes or
  // after the browser is closed
  constructor(
      private router: Router,
      private http: HttpClient
  ) {
      //this.userSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('user')!));
      //this.user = this.userSubject.asObservable();
  }
  /*
  public get userValue(): User {
      return this.userSubject.value;
  }
  */
  public isAuthenticated() {
    return this.authenticated;
  }

  login(username: string, password: string) {
      //var user: User;
      // console.log('AuthenticationService::login() called');
      // console.log('credentials: ' + username + ' ' + password);
      this.httpOptions = {
          headers: new HttpHeaders({
            'authorization': 'Basic ' + window.btoa((username + ':' + password)),
            'Content-Type':  'application/json',
            'Content-Security-Policy': 'default-src ' + `${environment.apiUrl}/;`
          }),
          observe: 'body' as const
      };

      return this.http.post<any>(`${environment.apiUrl}/api/login`, this.httpOptions)
      .pipe(map(
        (user: any) => {
              console.log("login data: " + user);
              this.authenticated = true;
              //if (user.name) {
                //let user: User = {} as User;
                // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                //user.name = user['name'];
                // sessionStorage.setItem('user', JSON.stringify(user));
                //  The user object is then published to all subscribers
                //this.userSubject.next(user);
                return user;
              //}
              //return null;

        }));
  }

  logout() {
      // remove user from local storage to log user out
      // sessionStorage.removeItem('user');
      // sessionStorage.removeItem('session');
      //  publishes null to all subscribers
      // this.userSubject.next({} as any);
      this.authenticated = false;
      //this.router.navigate(['/login']);
  }
}
