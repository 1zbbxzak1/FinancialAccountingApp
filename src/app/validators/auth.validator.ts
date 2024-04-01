import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password: AbstractControl | null = control.get('password');
    const repeatPassword: AbstractControl | null = control.get('repeatPassword');

    // Проверка совпадения паролей при регистрации
    if (password && repeatPassword && password.value !== repeatPassword.value) {
        repeatPassword.setErrors({'passwordMismatch': true});
        return {'passwordMismatch': true};
    }

    return null;
};
