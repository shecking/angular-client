// This basic authentication interceptor file "intercepts" HTTP responses to check for errors
// If a 401 response is thrown, user is logged out and errors are rethrown to display
// The HttpInterceptor interface is imported from the Angular library and used to create custom interceptors/modify HTTP requests
// Http interceptors (BasicAuthInterceptor, ErrorInterceptor) are added to the providers section of app.module.ts

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private accountService: AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.accountService.logout();
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}
