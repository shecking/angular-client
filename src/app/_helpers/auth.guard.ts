// This auth.guard file is an Angular route guard, used to prevent unauthorized users from accessing restricted routes.
// This is done by using the CanActivate interface, calling the canActivate method that returns a boolean to activate or block the restricted route
// CanActivate is an interface pulled from the Angular router library
// Auth guard is added to app-routing.module.ts to "protect the home page route"

import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AccountService } from '../_services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
