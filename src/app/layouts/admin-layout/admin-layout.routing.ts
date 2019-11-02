import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserManagementComponent } from '../../user-management/user-management.component';
import { HomeComponent } from '../../home/home.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'home',   component: HomeComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'user-management',   component: UserManagementComponent }
];
