import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidAuth} from "../../../validators/auth.validator";
import {IRegistrationRequestModel} from "../../../data/request-models/auth/IRegistration.request-model";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {IdentityService} from "../../../data/services/identity.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: '../../styles/authorization-styles.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
    protected formRegistration: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
        repeatPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    });

    private readonly _controlValidator: ValidAuth = new ValidAuth();

    constructor(
        @Inject(TuiDialogFormService) private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService) private readonly _dialogs: TuiDialogService,
        private _identityService: IdentityService,
        private _destroyRef: DestroyRef,
    ) {
        this._controlValidator.formGroup = this.formRegistration;
    }

    public openDialogRegistration(
        registration: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        const closeable: Observable<boolean> = this._dialogForm.withPrompt({
            label: 'Вы уверены?',
            data: {
                content: 'Ваши данные будут <strong>потеряны</strong>',
            },
        });

        this._dialogs.open(
            registration,
            {
                size,
                data: {button: 'Зарегистрироваться'},
                closeable,
                dismissible: closeable
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: () => {
                    this.formRegistration.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    protected isControlError(controlName: string): boolean {
        return this._controlValidator.isControlError(controlName);
    }

    protected isControlRequired(controlName: string): boolean {
        return this._controlValidator.isControlRequired(controlName);
    }

    protected isEmailInvalid(controlName: string): boolean {
        return this._controlValidator.isEmailInvalid(controlName);
    }

    protected isPasswordInvalid(controlName: string): boolean {
        return this._controlValidator.isPasswordInvalid(controlName);
    }

    protected isPasswordMismatch(controlPassword: string, controlRepeatPassword: string): boolean {
        return this._controlValidator.isPasswordMismatch(controlPassword, controlRepeatPassword);
    }

    protected registrationNewUser(): void {
        const email: string = this.formRegistration.get('email')?.value;
        const password: string = this.formRegistration.get('password')?.value;

        if (email && password) {
            const user: IRegistrationRequestModel = {email, password};

            this._identityService.registerWithEmailAndPassword(user)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (data: boolean): void => {
                        if (data) {
                            console.log('Registered successfully');
                            this._dialogForm.markAsDirty();
                        }
                    }
                );
        } else {
            console.error('Email and password are required');
        }
    }
}
