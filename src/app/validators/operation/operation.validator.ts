import {AbstractControl, FormGroup} from "@angular/forms";

export class OperationValidator {
    private readonly _formGroup!: FormGroup;

    constructor(formGroup: FormGroup) {
        this._formGroup = formGroup;
    }

    public isControlError(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && (control.dirty || control.touched);
    }

    public isControlRequired(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('required') && !control.dirty;
    }

    public isAmountInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('pattern') && control.dirty;
    }

    public isDateInvalid(controlName: string): boolean {
        const control: AbstractControl | null = this.getFormControl(controlName);
        return !!control && control.hasError('dateInvalid') && control.dirty;
    }

    private getFormControl(controlName: string): AbstractControl | null {
        return this._formGroup!.get(controlName);
    }
}
