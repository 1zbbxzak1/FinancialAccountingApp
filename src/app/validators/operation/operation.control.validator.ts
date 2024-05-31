import {AbstractControl} from "@angular/forms";
import {Injectable} from "@angular/core";

@Injectable()
export class OperationControlValidator {
    public dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
        const value = control.value;

        const datePattern: RegExp = /^\d{2}\.\d{2}\.\d{4}$/;
        if (!datePattern.test(value)) {
            return {'dateInvalid': true};
        }

        const [day, month, year] = value.split('.').map(Number);
        const date: Date = new Date(year, month - 1, day);

        const isIncorrectDate: boolean = date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day;

        return isIncorrectDate ? {'dateInvalid': true} : null;
    }
}
