import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  configUrl = 'https://valley-schools-backend.herokuapp.com';

  constructor(private http: HttpClient) {}

  getUser(user: {username: string}): Observable<boolean> {
      console.log("inside UserProfileService service");
    return this.http.post<any>(`${this.configUrl}/hello`, user)
      .pipe(
        tap(tokens => console.log('#after getUser ' + tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

 
}
