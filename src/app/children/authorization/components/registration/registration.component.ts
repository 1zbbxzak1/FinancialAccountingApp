import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {IdentityService} from "../../../../data/services/auth/identity.service";
import {AuthBaseComponent} from "../../services/auth-base-component";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../../styles/authorization-styles.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent extends AuthBaseComponent {
    constructor(
        private readonly _identityService: IdentityService,
    ) {
        super(new FormGroup({
            email: new FormControl("", [Validators.required, Validators.email]),
            password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
            repeatPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
        }));
    }

    protected userRegistration(): void {
        this.authUser(this._identityService.registerWithEmailAndPassword.bind(this._identityService));
    }
}
