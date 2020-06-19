// This file is the root component of the entire application
// The root tag is defined under the @Component decorator with 'app-root'
// Subscription is used on the observable `user` from authenticationService (where is accountService??), which will hide or show the nav bar based on user status (logged in or logged out)
// A logout() method is defined, redirecting to login page upon successful logout

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router'

import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  user: User;
  title: 'box-the-house-client';

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private accountService: AccountService
  ) {
    this.accountService.user.subscribe(res => this.user = res)
  }

  logout() {
    this.accountService.logout()
  }
}
