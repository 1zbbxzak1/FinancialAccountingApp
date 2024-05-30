import { ChangeDetectionStrategy, Component, DestroyRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserManagerService } from '../../../../../../data/services/user/user.manager.service';
import { UserModel } from '../../../../../../data/models/user/user.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TuiAlertService } from '@taiga-ui/core';

@Component({
    selector: 'app-security',
    templateUrl: './security.component.html',
    styleUrl: './styles/security.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SecurityComponent {

    protected userEmail!: string;

    protected securityForm:FormGroup = new FormGroup({
      previousPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    })

    constructor(
    private _userMAnagerService: UserManagerService,
    private _destroyRef: DestroyRef,
    private readonly _alerts: TuiAlertService){

        const userId: string = localStorage.getItem('uid')!;
        this._userMAnagerService.getUserInfo(userId)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe((data:UserModel)=>
        this.userEmail = data.email);
    }

    protected updatePassword(): void {
        this._userMAnagerService.updatePassword(this.userEmail, this.securityForm.get('previousPassword')?.value, this.securityForm.get('newPassword')?.value)
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe(()=> this._alerts.open("Пароль обновлен")
        .pipe(takeUntilDestroyed(this._destroyRef))
        .subscribe());
    }
}
