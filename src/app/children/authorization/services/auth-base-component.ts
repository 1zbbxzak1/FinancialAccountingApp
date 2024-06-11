import {FormGroup} from "@angular/forms";
import {ValidAuth} from "../../../validators/auth/auth.validator";
import {DestroyRef, inject} from "@angular/core";
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {Router} from "@angular/router";
import {PolymorpheusContent} from "@tinkoff/ng-polymorpheus";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {Observable} from "rxjs";
import {IAuthDataRequestModel} from "../../../data/request-models/auth/IAuthData.request-model";

export class AuthBaseComponent {
    private readonly _dialogForm: TuiDialogFormService = inject(TuiDialogFormService);
    private readonly _dialogs: TuiDialogService = inject(TuiDialogService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);
    private readonly _router: Router = inject(Router);

    private readonly _controlValidator: ValidAuth = new ValidAuth(this.formAuth);

    constructor(protected formAuth: FormGroup) {
    }

    public openDialogAuth(
        auth: PolymorpheusContent<TuiDialogContext>,
        size: TuiDialogSize,
    ): void {
        this._dialogs.open(
            auth,
            {
                size,
            })
            .pipe(
                takeUntilDestroyed(this._destroyRef)
            )
            .subscribe({
                complete: (): void => {
                    this.formAuth.reset();
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

    protected authUser(actionFunction: (user: IAuthDataRequestModel) => Observable<void>): void {
        const email: string = this.formAuth.get('email')?.value;
        const password: string = this.formAuth.get('password')?.value;

        if (email && password) {
            const user: IAuthDataRequestModel = {email, password};
            actionFunction(user)
                .pipe(
                    takeUntilDestroyed(this._destroyRef)
                )
                .subscribe(
                    (): void => {
                        this._dialogForm.markAsDirty();

                        this._router.navigate(["dashboard/main"]);
                    }
                );
        }
    }
}
