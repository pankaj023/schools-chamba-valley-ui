import { Component, OnInit, Input } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { UserProfileService } from '../services/user-profile.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userObj: User;
  temp: string;
  allUsers: User[];
  username: string;
  private sub: any;
  error = '';
  loading = false;
  configUrl = 'https://chamba-valley-school-back-end.herokuapp.com';

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private userProfileService: UserProfileService) {

  }

  ngOnInit() {
    this.userObj = new User();
    this.sub = this.route.queryParams.subscribe(params => {
      this.username = params["userName"];
      console.log("userName1: " + this.username);
    });

    if (typeof this.username === 'undefined') {
      this.username = localStorage.getItem('currentUser');
      console.log("userName2: " + this.username);
    }

    this.http.get(`${this.configUrl}/users` + this.username).subscribe((result : User)=> {
      this.userObj  = result; 
      console.log("this.userObj: " + this.userObj);
    })
    //this.http.get("http://localhost:8080/hello").subscribe();

    // this.http.post<any>('http://localhost:8080/authenticate', this.username).subscribe();

    //  console.log(this.userName);
    //  console.log(this.password);
    // this.userProfileService.getUser({
    //   username: this.username
    // })
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       console.log("this.userProfileService.getUser: " + data)
    //     },
    //     error => {
    //       this.error = error;
    //       this.loading = false;
    //     });
  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


}
