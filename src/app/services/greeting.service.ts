import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ObservedValueOf, Subscribable, Subscription, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class GreetingService {

  httpOptions: any;

  constructor(
      private router: Router,
      private http: HttpClient
  ) {
  }

  greeting() {
      this.httpOptions = {
          headers: new HttpHeaders({
            'Content-Type':  'text/plain',
            'Content-Security-Policy': 'default-src ' + `${environment.apiUrl}/;`
          }),
          observe: 'body' as const,
          responseType: 'text' as 'text'
      };

      return this.http.get(`${environment.apiUrl}/api/delay`, { ...this.httpOptions, responseType: 'text' })
      .pipe(map(
        (response: any) => {
              const greeting = response;
              console.log("greeting data: " + greeting);
                return greeting;
        }));
  }

}
