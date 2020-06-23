// THIS FILE WILL HANDLE COMMUNICATION BETWEEN ANGULAR AND THE BACKEND API FOR ACCOUNTS

// It contains login/logout/registration methods, as well as the standard CRUD

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
        this.user = this.userSubject.asObservable();
    }
    //
    //
    // This public getter allows components to get the current logged in user without executing a `subscribe` method on the `user` observable
    public get userValue(): User {
        return this.userSubject.value;
    }
    //
    //
    // POST request for login
    login(username:string, password:string) {
        return this.http.post<User>(`${environment.apiUrl}/login`, { credentials: { username, password }})
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                user.authdata = window.btoa(username + ':' + password);
                localStorage.setItem('user', JSON.stringify(user));
                this.userSubject.next(user);
                return user;
            }));
    }
    //
    //
    // removeItem method (instead of HTTP DELETE?)
    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(null);
        this.router.navigate(['/account/login']);
    }
    //
    //
    // POST request for registering a new user
    register(first_name:string, last_name:string, username:string, password:string) {
        return this.http.post<User>(`${environment.apiUrl}/register`, { credentials: { first_name, last_name, username, password } });
    }
    //
    //
    // PUT request for changing password
    // changePassword(data){
    //     const headers = new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('usertoken'));
    //
    //     const options =  { headers: headers }
    //
    //     return this.http.put(`${environment.apiUrl}/changepw`,data, options)
    // }
    //
    // GET request for getting all users
    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }
    //
    //
    // GET request for getting single user
    getById(id: string) {
        return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
    }
    //
    //
    // PUT (similar to PATCH) request for updating a user
    update(id: number, params) {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.userValue.id) {
                    // update local storage
                    const user = { ...this.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.userSubject.next(user);
                }
                return x;
            }));
    }
    //
    //
    // DELETE request for logging a user out
    delete(id: string) {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                // The code immediately following this line might be problematic/bug inducing:
                // if (id == this.userValue.id) {
                //     this.logout();
                // }
                return x;
            }));
    }
}
