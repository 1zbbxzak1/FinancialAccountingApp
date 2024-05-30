import { Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup} from '@angular/forms';
import { UserManagerService } from '../../../../../../data/services/user/user.manager.service';
import { UserModel } from '../../../../../../data/models/user/user.model';
import { IUserRequestModel, UserModelToIUserRequestModel } from '../../../../../../data/request-models/user/IUser.request-model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { TuiHostedDropdownComponent, TuiAlertService } from '@taiga-ui/core';
import { userPhotoIsCorrect } from '../../../../../../validators/user/user.validator';

@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrl: './styles/edit-profile.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileComponent {

    private _userId: string = localStorage.getItem('uid')!;

    protected userInfoForm: FormGroup = new FormGroup({
        name: new FormControl(''),
        surname: new FormControl(''),
        email: new FormControl(''),
        dateOfBirthTimestamp: new FormControl(''),
        permanentAddress: new FormControl(''),
        presentAddress: new FormControl(''),
        postalCode: new FormControl(''),
        city: new FormControl(''),
        country: new FormControl(''),
        notification: new FormControl('false'),
        photoURL: new FormControl(''),
    });

    constructor(
        private _userManagerService: UserManagerService,
        private _destroyRef: DestroyRef,
        private readonly _alert: TuiAlertService)
      {
          this._userManagerService.getUserInfo(this._userId)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((data:UserModel)=>
          this.userInfoForm.setValue({
              name: data.name,
              surname: data.surname,
              email: data.email,
              dateOfBirthTimestamp: data.dateOfBirthTimestamp ? new Date(data.dateOfBirthTimestamp).toLocaleDateString() : '',
              permanentAddress: data.permanentAddress,
              presentAddress: data.presentAddress,
              postalCode: data.postalCode,
              city: data.city,
              country: data.country,
              notification: data.notification,
              photoURL: data.photoURL,
          }));
      }

    @ViewChild(TuiHostedDropdownComponent) component?: TuiHostedDropdownComponent;

    protected open = false;

    protected onFileLoaded(file:File): void{
        if(userPhotoIsCorrect(file)){
          this._userManagerService.uploadUserPhoto(this._userId, file);
        }
        else{
          this._alert.open("Неверный формат файла")
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe();
        }
    }

    protected onClick(): void {
        this.open = true;
        this.component?.nativeFocusableElement?.focus();
    }

    protected saveUpdate(): void
    {
        const dateValues: string[] = (this.userInfoForm.get('dateOfBirthTimestamp')?.value).split(".");
        let date: Date = new Date(+dateValues[2], +dateValues[1]-1, +dateValues[0]);

        const user: UserModel = new UserModel(this.userInfoForm.value);
        user.dateOfBirthTimestamp = date.getTime();
        const userForRequest:IUserRequestModel = UserModelToIUserRequestModel(user);

        this._userManagerService.updateUserInfo(this._userId, userForRequest)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(()=>this._alert.open("Информация обновлена!")
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe());
    }
    
}
