// This file includes an NgModule definition, that specifies the properties of the account feature module
// Imports are other Angular modules that are required by this module
// Declarations are components that will belong to this specific module (account.module.ts)

import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { LayoutComponent } from './layout.component';
// import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountRoutingModule
    ],
    declarations: [
        LayoutComponent,
        // LoginComponent,
        RegisterComponent
    ]
})
export class AccountModule { }
