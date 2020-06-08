import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Router } from '@angular/router'
// import { Book } from '../models/book'

import { AuthenticationService } from './_services/authentication.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient]
})
export class AppComponent {
  user: User;
  title = 'box-the-house-client';
  books: any;

  constructor(
    // private http: HttpClient,
    // private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.authenticationService.user.subscribe(x => this.user = x)
  }

  logout() {
    this.authenticationService.logout()
  }
}
