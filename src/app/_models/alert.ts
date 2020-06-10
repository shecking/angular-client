// This is the alert model, listing the properties of each alert instance

export class Alert {
    id: string;
    type: AlertType;
    message: string;
    autoClose: boolean;
    keepAfterRouteChange: boolean;
    fade: boolean;

    constructor(init?:Partial<Alert>) {
        Object.assign(this, init);
    }
}


// This enum defines the different types of alerts
export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
