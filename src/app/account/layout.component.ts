// This is the root component of the account feaure. It assigns the property `templateUrl` the value `layout.component.html`, and binds it to the @Component decorator
// Angular decorators are used to separately modify a class WITHOUT changing the original code.
// In this file, the class decorator (@Component) is used to modify the layout component

import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services/account.service';

@Component({ templateUrl: 'layout.component.html' })
export class LayoutComponent {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {
        // redirect to home if already logged in
        if (this.accountService.userValue) {
            this.router.navigate(['/']);
        }
    }
}
