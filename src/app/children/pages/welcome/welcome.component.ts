import {Component, ViewChild} from '@angular/core';
import {RegistrationComponent} from "../../../authorization/components/registration/registration.component";
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogSize} from "@taiga-ui/core";
import {TuiDialogFormService} from "@taiga-ui/kit";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.component.html',
    styleUrl: './styles/welcome.component.scss',
    providers: [TuiDialogFormService],
})
export class WelcomeComponent {
    @ViewChild(RegistrationComponent) registrationComponent!: RegistrationComponent;

    constructor(
        private _router: Router,
    ) {
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this.registrationComponent.openDialogRegistration(registration, size);
    }
}
