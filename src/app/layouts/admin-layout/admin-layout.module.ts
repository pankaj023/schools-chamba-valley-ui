import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { CdkTableModule } from '@angular/cdk/table';
import { MatPaginatorModule, MatTableModule } from '@angular/material';
import { HomeComponent } from '../../home/home.component';
import { StaffManagementComponent } from '../../user-management/staff-management/staff-management.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    CdkTableModule,
    MatPaginatorModule,
    MatTableModule,
  ],
  declarations: [
    UserProfileComponent,
    UserManagementComponent,
    HomeComponent,
    StaffManagementComponent
  ]
})

export class AdminLayoutModule {}
