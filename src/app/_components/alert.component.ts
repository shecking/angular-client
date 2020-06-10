// This alert component controls alert adding and removing, and holds an array of alerts to be rendered and displayed
// See instances of alerts: Alert below
// Alert/AlertType housed in _models, AlertService housed in _services

import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs';

import { Alert, AlertType } from '../_models/alert';
import { AlertService } from '../_services/alert.service';

@Component({ selector: 'alert', templateUrl: 'alert.component.html' })
export class AlertComponent implements OnInit, OnDestroy {
    @Input() id = 'default-alert';
    @Input() fade = true;

    alerts: Alert[] = [];
    alertSubscription: Subscription;
    routeSubscription: Subscription;

    constructor(private router: Router, private alertService: AlertService) { }

    // An observable/observable instance, a POJO, is the recommended way to handle events, run async programs, and handle multiple values in Angular (see https://angular.io/guide/observables)
    // A subscriber function is called on an observable and is executed with the subscribe() method, which returns a Subscription object

    // This ngOnInit method does two things:
    // 1. It subscribes to the returned observable from alertService (enabling alert component to be notified of an alert message)
    // 2. It subscribes to route changes in order to clear alerts when the route is changed
    ngOnInit() {
        this.alertSubscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                // clear alerts when an empty alert is received
                if (!alert.message) {
                    // filter out alerts without 'keepAfterRouteChange' flag
                    this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

                    // remove 'keepAfterRouteChange' flag on the rest
                    this.alerts.forEach(x => delete x.keepAfterRouteChange);
                    return;
                }

                // add alert to array
                this.alerts.push(alert);

                // auto close alert if required
                if (alert.autoClose) {
                    setTimeout(() => this.removeAlert(alert), 3000);
                }
           });

        // clear alerts on location change
        this.routeSubscription = this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.alertService.clear(this.id);
            }
        });
    }

    // This ngOnDestroy method uses the unsubscribe function to cut ties from the alert service and router (see above)
    // This prevents unnecessary memory usage and "leaks" from the existence of any unattached subscriptions
    ngOnDestroy() {
        this.alertSubscription.unsubscribe();
        this.routeSubscription.unsubscribe();
    }

    // This removeAlert method allows alerts to be closed by removing the alert object from the alert array
    removeAlert(alert: Alert) {
        // check if already removed to prevent error on auto close
        if (!this.alerts.includes(alert)) return;

        if (this.fade) {
            // fade out alert
            this.alerts.find(x => x === alert).fade = true;

            // remove alert after faded out
            setTimeout(() => {
                this.alerts = this.alerts.filter(x => x !== alert);
            }, 250);
        } else {
            // remove alert
            this.alerts = this.alerts.filter(x => x !== alert);
        }
    }

    // This cssClass method returns an appropriate boostrap alert, one for each class alertTypeClass
    // These can be changed if something other than CSS is used
    cssClass(alert: Alert) {
        if (!alert) return;

        const classes = ['alert', 'alert-dismissable', 'mt-4', 'container'];

        const alertTypeClass = {
            [AlertType.Success]: 'alert alert-success',
            [AlertType.Error]: 'alert alert-danger',
            [AlertType.Info]: 'alert alert-info',
            [AlertType.Warning]: 'alert alert-warning'
        }

        classes.push(alertTypeClass[alert.type]);

        if (alert.fade) {
            classes.push('fade');
        }

        return classes.join(' ');
    }
}
