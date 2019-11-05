import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry, map, isEmpty } from 'rxjs/operators';
import { User } from '../models/user.model';


@Injectable()
export class UserManagementService {
  configUrl = 'https://valley-schools-backend.herokuapp.com';
  

  constructor(private http: HttpClient) { }

//   getConfig() {
//     return this.http.get<User>(this.configUrl)
//       .pipe(
//         retry(3), // retry a failed request up to 3 times
//         catchError(this.handleError) // then handle the error
//       );
//   }

getUsers(userObj: User): Observable<HttpResponse<User[]>> {
  console.log("clicked");
   
  let params = new HttpParams()
    .set('firstName', userObj.firstName)
    .set('lastName', userObj.lastName)
    .set('city', userObj.city)
    .set('postalCode', userObj.postalCode);
    
    return this.http.get<User[]>(
      `${this.configUrl}/users`, { observe: 'response', params
    })
      .pipe(
                retry(3), // retry a failed request up to 3 times
        catchError(this.handleError));// then handle the error;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }

}
