import {Component, DestroyRef, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {AuthService} from "../../../data/services/auth.service";
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {Observable} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ILoginRequestModel} from "../../../data/request-models/auth/ILogin.request-model";
import {IdentityService} from "../../../data/services/identity.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: '../../styles/authorization-styles.scss'
})
export class LoginComponent {
    public formLogin: FormGroup = new FormGroup({
        email: new FormControl("", [Validators.required, Validators.email]),
        password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });


    constructor(
        @Inject(TuiDialogFormService)
        private readonly _dialogForm: TuiDialogFormService,
        @Inject(TuiDialogService)
        private readonly _dialogs: TuiDialogService,
        private _identityService: IdentityService,
        private _destroyRef: DestroyRef,
        private _router: Router,
    ) {
    }

    public openDialogLogIn(
        login: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        const closeable: Observable<boolean> = this._dialogForm.withPrompt({
            label: 'Вы уверены?',
            data: {
                content: 'Ваши данные будут <strong>потеряны</strong>',
            },
        });

        this._dialogs.open(
            login,
            {
                size,
                data: {button: 'Войти'},
                closeable,
                dismissible: closeable
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: () => {
                    this.formLogin.reset();
                    this._dialogForm.markAsPristine();
                },
            });
    }

    public logInUser(): void {
        const email = this.formLogin.get('email')?.value;
        const password = this.formLogin.get('password')?.value;

        if (email && password) {
            const user: ILoginRequestModel = {email, password};
            this._identityService.loginWithEmailAndPassword(user)
                .subscribe(
                data => {
                    if (data) {
                        console.log('LogIn successfully');
                        this._dialogForm.markAsDirty();
                    }
                }
            );
        } else {
            console.error('Email and password are required');
        }
    }
}
