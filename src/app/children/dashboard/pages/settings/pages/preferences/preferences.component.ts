import {AfterViewInit, ChangeDetectionStrategy, Component, DestroyRef, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild, ɵallowSanitizationBypassAndThrow} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
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
  protected notificationForm:FormGroup = new FormGroup({
    notification: new FormControl('false')
  });
  protected user!: UserModel;

  @ViewChild('timezone') timeZoneInput!: ElementRef;

  constructor(
    private _userManagerService: UserManagerService,
    private _destroyRef: DestroyRef,
    ){}

  public ngOnInit(): void{
    const userId: string = localStorage.getItem('uid')!;
    this._userManagerService.getUserInfo(userId)
    .pipe(takeUntilDestroyed(this._destroyRef))
    .subscribe((data:UserModel)=>{
      this.user = data;
      this.notificationForm.setValue({
        notification: data.notification
      })
    });
  }

  public ngAfterViewInit(): void {
    this.timeZoneInput.nativeElement.value = Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  protected changeStateToggle(){
    this.user.notification = !this.notificationForm.get('notification')?.value;
  }

  protected updateInfoNotification(){
    if(this.user){
      const userForRequest: IUserRequestModel = UserModelToIUserRequestModel(this.user);
      this._userManagerService.updateUserInfo(this._userId, userForRequest)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(()=>console.log(userForRequest));
    }
  }
}
