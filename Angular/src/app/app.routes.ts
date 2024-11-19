import { Routes } from '@angular/router';
import {HomeComponent} from "./page/home/home.component";
import {LoginComponent} from "./page/login/login.component";
import {AdmComponent} from "./page/adm/adm.component";
import {ProfileComponent} from "./page/profile/profile.component";
import {UserComponent} from "./page/user/user.component";
import {authGuard} from "./guard/auth.guard";
import {adminGuard} from "./guard/admin.guard";

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [authGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'admin', component: AdmComponent, canActivate: [adminGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [authGuard]},
  {path: 'user', component: UserComponent, canActivate: [authGuard]},
];
