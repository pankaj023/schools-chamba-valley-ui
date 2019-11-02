import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  configUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getUser(user: {username: string}): Observable<boolean> {
      console.log("inside UserProfileService service");
    return this.http.post<any>('http://localhost:8080/hello', user)
      .pipe(
        tap(tokens => console.log('#after getUser ' + tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

 
}
