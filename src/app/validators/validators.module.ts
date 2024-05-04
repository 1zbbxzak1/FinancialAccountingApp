import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserValidator} from "./user/user.validator";



@NgModule({
    declarations: [],
    imports: [
    CommonModule
    ],
    providers: [
        UserValidator,
    ],
})
export class ValidatorsModule { }
