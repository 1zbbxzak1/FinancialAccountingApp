import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {TuiDialogFormService} from "@taiga-ui/kit";
import {Router} from "@angular/router";
import {LoginComponent} from "../../authorization/components/login/login.component";
import {RegistrationComponent} from "../../authorization/components/registration/registration.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogSize} from "@taiga-ui/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './styles/header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDialogFormService],
})
export class HeaderComponent {
    @ViewChild(LoginComponent) loginComponent!: LoginComponent;
    @ViewChild(RegistrationComponent) registrationComponent!: RegistrationComponent;

    protected isCollapsed: boolean = false;

    constructor(
        private _router: Router,
    ) {
    }

    protected toggleSidebar(isCollapsed: boolean): void {
        this.isCollapsed = isCollapsed;
    }

    protected openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this.loginComponent.openDialogLogIn(login, size);
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this.registrationComponent.openDialogRegistration(registration, size);
    }
}
