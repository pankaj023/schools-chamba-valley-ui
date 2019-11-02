import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("inside JwtInterceptor ");
    // add authorization header with jwt token if available
    let token = localStorage.getItem('JWT_TOKEN');

    const authReq = request.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
    console.log("#########request#############:" + authReq.headers.getAll('Authorization'));
    console.log(request.url);
    if (token) {
      console.log("######### insied token ########");
      return next.handle(authReq);
    }
    return next.handle(request);
  }


}