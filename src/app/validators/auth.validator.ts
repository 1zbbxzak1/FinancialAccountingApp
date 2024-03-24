import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export const passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const password= control.get('password');
  const repeatPassword = control.get('repeatPassword');

  if (password && repeatPassword && password.value !== repeatPassword.value) {
    repeatPassword.setErrors({ 'passwordMismatch': true });
    return { 'passwordMismatch': true };
  } else {
    repeatPassword?.setErrors(null);
    return null;
  }
};
