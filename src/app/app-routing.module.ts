// Routing in Angular is performed by using an array of routes, seen below
// Each component is mapped to a path/route so that Angular knows which component to display at a particular URL
// The `routes` array is passed to RouterModule.forRoot() that creates a module with all of the app routes, and uses directives like <router-outlet> (seen in app.component.html)

//

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { AuthGuard } from './_helpers/auth.guard'

const accountModule = () => import('./account/account.module').then(x => x.AccountModule);
const usersModule = () => import('./users/users.module').then(x => x.UsersModule);

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent},
  // mapping into /users/users.module.ts, using AuthGuard for security
  { path: 'users', loadChildren: usersModule, canActivate: [AuthGuard] },
  // { path: 'users', loadChildren: usersModule },
  // mapping into /account/account.module.ts, using AuthGuard for security
  { path: 'account', loadChildren: accountModule },
  // otherwise redirect to homepage (mapping to the root path of the application)
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
