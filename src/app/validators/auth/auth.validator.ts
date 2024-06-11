import {AbstractControl, FormGroup} from "@angular/forms";

export class ValidAuth {
    private readonly _formGroup!: FormGroup;

    constructor(formGroup: FormGroup) {
        this._formGroup = formGroup;
    }

    public getFormControl(controlName: string): AbstractControl | null {
        return this._formGroup!.get(controlName);
    }

    public isControlError(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.invalid && (control.dirty || control.touched);
    }

    public isControlRequired(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('required');
    }

    public isEmailInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('email');
    }

    public isPasswordInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('minlength');
    }

    public isPasswordMismatch(controlPassword: string, controlRepeatPassword: string): boolean {
        const password: AbstractControl | null = this.getFormControl(controlPassword);
        const repeatPassword: AbstractControl | null = this.getFormControl(controlRepeatPassword);
        return !!password && !!repeatPassword && password.value != repeatPassword.value && (repeatPassword.dirty || repeatPassword.touched);
    }
}
