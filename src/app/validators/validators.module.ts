import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { userPhotoIsCorrect } from './user/user.validator';



@NgModule({
    declarations: [],
    imports: [
    CommonModule
    ],
    providers: [
        {provide: userPhotoIsCorrect, useValue: userPhotoIsCorrect}
    ],
})
export class ValidatorsModule { }
