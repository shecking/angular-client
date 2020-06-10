// This file is responsible for getting all the users with ngOnInit and the getAll() method defined in account.service.ts, and assigns them to `users` (defined before the constructor)
// Additionally, it defines a deleteUser method in tandem with accountService.delete to remove the user/user id from the users array

import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '../_services/account.service';

@Component({ templateUrl: 'list.component.html' })
export class ListComponent implements OnInit {
    users = null;

    constructor(private accountService: AccountService) {}

    ngOnInit() {
        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => {
                this.users = this.users.filter(x => x.id !== id)
            });
    }
}
