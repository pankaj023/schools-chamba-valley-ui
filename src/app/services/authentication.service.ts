import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';
import { Tokens } from '../models/tokens';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userObj: User;
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  configUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  login(user: { username: string, password: string }): Observable<boolean> {
      console.log("inside AuthenticationService login");
    return this.http.post<any>(`${this.configUrl}/authenticate`, user)
      .pipe(
        tap(tokens => this.doLoginUser(user.username, tokens)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  logout() : Observable<boolean> {
    console.log("inside new logout");
    let params = new HttpParams()
    .set('firstName', localStorage.getItem(this.JWT_TOKEN));
    this.userObj = new User();
    this.userObj.firstName =localStorage.getItem(this.JWT_TOKEN);
    return this.http.post<any>(`${this.configUrl}/tokenremo`, this.userObj)
    .pipe(
      tap(() => this.doLogoutUser()),
      mapTo(true),
      catchError(error => {
        alert(error.error);
        return of(false);
      }));
  }

  private doLoginUser(username: string, tokens: Tokens) {
    localStorage.setItem('currentUser', username);
    localStorage.setItem(this.JWT_TOKEN, tokens.token);
  }

  private doLogoutUser() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem(this.JWT_TOKEN);
  }
}
