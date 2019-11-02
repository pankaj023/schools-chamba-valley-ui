import { Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserManagementService } from './user-management-service';
import { User } from '../models/user.model';
import { Router, NavigationExtras } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';


@Component({
  selector: 'app-user',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  providers: [ UserManagementService ]
})

export class UserManagementComponent implements OnInit {

  displayedColumns: string[] = ['editProfile','userName', 'firstName','lastName','city','postalCode','address','email'];

  allUsers:  User[];
  dataSource: MatTableDataSource<any>;
  userObj: User;
  headers: string[];
  constructor(private http: HttpClient, private userManagementService: UserManagementService, private router: Router) {
    
  }
  
 @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.userObj = new User();
   // this.dataSource.paginator = this.paginator;
  }

  getUsers(){
    
    // this.http.get("http://localhost:8080/users").subscribe((result : User[])=> {
    //   this.allUsers  = result; 
    //   this.dataSource = new MatTableDataSource(this.allUsers);
    // });
      this.userManagementService.getUsers(this.userObj)
      .subscribe(response => {
        // const keys = response.headers.keys();
        // this.headers = keys.map(key =>
        //   `${key}: ${response.headers.get(key)}`); 
        this.allUsers = response.body; 
        this.dataSource = new MatTableDataSource(this.allUsers);
        console.log(this.allUsers);
        
      });
    
  }
  editProfile(element: User){
    let navigationExtras: NavigationExtras = {
      queryParams: {
          "userName": element.userName
      }
  };
   this.router.navigate(['user-profile'], navigationExtras);
   
  }

 
}

