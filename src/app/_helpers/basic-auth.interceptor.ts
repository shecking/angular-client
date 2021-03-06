// This basic authentication interceptor file "intercepts" HTTP requests and adds authorization credentials to the Auth header if a user is logged in
// The HttpInterceptor interface is imported from the Angular library and used to create custom interceptors/modify HTTP requests
// Http interceptors (BasicAuthInterceptor, ErrorInterceptor) are added to the providers section of app.module.ts

// NOTE: See below site for use of a JWT interceptor, JWT authorization token, and import of AccountService instead of (?) importing AuthenticationService
// In this case, JwtInterceptor would be imported and added to the providers list in app.module.ts, INSTEAD OF BasicAuthInterceptor
// https://jasonwatmore.com/post/2020/04/28/angular-9-user-registration-and-login-example-tutorial#jwt-interceptor-ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AccountService } from '../_services/account.service';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add header with basic auth credentials if user is logged in and request is to the api url
        const user = this.accountService.userValue;
        const isLoggedIn = user && user.authdata;
        const isApiUrl = request.url.startsWith(`${environment.apiUrl}`);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${user.authdata}`
                }
            });
        }

        return next.handle(request);
    }
}
