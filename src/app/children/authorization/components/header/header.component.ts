import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RegistrationComponent} from "../registration/registration.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogSize} from "@taiga-ui/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './styles/header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
    protected isCollapsed: boolean = false;
    @ViewChild(RegistrationComponent) private readonly _registrationComponent!: RegistrationComponent;
    @ViewChild(LoginComponent) private readonly _loginComponent!: LoginComponent;

    constructor() {
    }

    protected toggleSidebar(isCollapsed: boolean): void {
        this.isCollapsed = isCollapsed;
    }

    protected openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._loginComponent.openDialogAuth(login, size);
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._registrationComponent.openDialogAuth(registration, size);
    }
}
