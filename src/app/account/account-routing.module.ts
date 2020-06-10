// This file defines the routes for the account feature module, including login/registration, and a parent route for LayoutComponent (with children LoginComponent and RegisterComponent)
// This ensures that we only have to write layout code one time; as Login and Register are children of the Layout route (no specified path), they will both adopt its code

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountRoutingModule { }
