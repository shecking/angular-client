// Routing in Angular is performed by using an array of routes, seen below
// Each component is mapped to a path/route so that Angular knows which component to display at a particular URL
// The `routes` array is passed to RouterModule.forRoot() that creates a module with all of the app routes, and uses directives like <router-outlet> (seen in app.component.html)

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { LoginComponent } from './login/login.component'
import { AuthGuard } from './_helpers/auth.guard'

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  // otherwise redirect to homepage
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
