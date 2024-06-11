import {ChangeDetectionStrategy, Component, ViewChild} from '@angular/core';
import {RegistrationComponent} from "../../components/registration/registration.component";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogSize} from "@taiga-ui/core";
import {TuiDialogFormService} from "@taiga-ui/kit";

@Component({
    selector: 'app-welcome',
    templateUrl: './welcome.page.html',
    styleUrl: './styles/welcome.page.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [TuiDialogFormService],
})

export class WelcomePage {
    @ViewChild(RegistrationComponent) private readonly _registrationComponent!: RegistrationComponent;

    constructor() {
    }

    protected openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._registrationComponent.openDialogAuth(registration, size);
    }
}
