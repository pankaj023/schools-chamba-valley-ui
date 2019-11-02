import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  userName: any;
  password: any;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
    
      // reset login status
      this.authenticationService.logout();
  }



  login() {
    //  console.log(this.userName);
    //  console.log(this.password);
      this.authenticationService.login({
        username: this.userName,
        password: this.password
      })
          .pipe(first())
          .subscribe(
              data => {
                console.log("After login authentication: " + data)
                  this.router.navigate(['home']);
              },
              error => {
                  this.error = error;
                  this.loading = false;
              });
  }
}