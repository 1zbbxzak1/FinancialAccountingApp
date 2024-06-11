import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {userPhotoIsCorrect} from './user/user.validator';
import {OperationControlValidator} from "./operation/operation.control.validator";


@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    providers: [
        OperationControlValidator,
        {provide: userPhotoIsCorrect, useValue: userPhotoIsCorrect}
    ],
})
export class ValidatorsModule {
}
