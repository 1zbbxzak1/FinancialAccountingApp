import {AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ɵallowSanitizationBypassAndThrow} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { UserManagerService } from '../../../../../../data/services/user/user.manager.service';
import { UserModel } from '../../../../../../data/models/user/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IUserRequestModel, UserModelToIUserRequestModel } from '../../../../../../data/request-models/user/IUser.request-model';

@Component({
    selector: 'app-preferences',
    templateUrl: './preferences.component.html',
    styleUrl: './styles/preferences.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreferencesComponent implements OnInit, AfterViewInit{

    private _userId: string = localStorage.getItem('uid')!;
    
    protected notificationForm: FormGroup = new FormGroup({
        notification: new FormControl('false')
    });
    
    private _user!: UserModel;

    @ViewChild('timezone') timeZoneInput!: ElementRef;

    constructor(
      private _userManagerService: UserManagerService,
      private _destroyRef: DestroyRef,
      private _alert: TuiAlertService,
    ) {}

    public ngOnInit(): void {
      
        this._userManagerService.getUserInfo(this._userId)
          .pipe(takeUntilDestroyed(this._destroyRef))
          .subscribe((data: UserModel) => {
            this._user = data;
            this.notificationForm.setValue({
              notification: data.notification
            });
          });
    }

    public ngAfterViewInit(): void {
        this.timeZoneInput.nativeElement.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    protected changeStateToggle(): void {
        this._user.notification = !this.notificationForm.get('notification')?.value;
    }

    protected updateInfoNotification(): void {
        if (this._user) {
            const userForRequest: IUserRequestModel = UserModelToIUserRequestModel(this._user);
            
            this._userManagerService.updateUserInfo(this._userId, userForRequest)
              .pipe(takeUntilDestroyed(this._destroyRef))
              .subscribe(() => this._alert.open("Информация обновлена!")
                .pipe(takeUntilDestroyed(this._destroyRef))
                .subscribe());
        }
    }
}
