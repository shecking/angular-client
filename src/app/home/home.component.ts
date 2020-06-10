// This home component gets all the users from the user service and makes them available with a `users` array property

import { Component } from '@angular/core';
// import { first } from 'rxjs/operators';

import { User } from '../_models/user';
// import { UserService } from '../_services/user.service'
import { AccountService } from '../_services/account.service'

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  loading = false;
  user: User;

  // constructor(private userService: UserService) { }
  constructor(private accountService: AccountService) {
    this.user = this.accountService.userValue;
  }
}
