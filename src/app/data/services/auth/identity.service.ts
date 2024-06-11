import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {catchError, map, Observable} from "rxjs";
import {IAuthDataRequestModel} from "../../request-models/auth/IAuthData.request-model";
import {IUserRequestModel, ParamsToIUserRequestModel} from "../../request-models/user/IUser.request-model";
import {UserManagerService} from "../user/user.manager.service";
import {CustomError} from "../../../global-error-handler/global-error-handler.service";


@Injectable()
export class IdentityService {
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _userManager: UserManagerService = inject(UserManagerService);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.registerWithEmailAndPassword(user).pipe(
            map((uid: string): void => {
                localStorage.setItem('uid', uid);

                const userInfo: IUserRequestModel = ParamsToIUserRequestModel(user.email, false);

                this._userManager.createUserInfo(uid, userInfo);
            }),
            catchError(err => {
                switch (err.code) {
                    case('auth/email-already-in-use'): {
                        throw new CustomError(err, 'Указанная почта уже используется');
                    }
                    case('"auth/too-many-requests"'): {
                        throw new CustomError(err, 'Доступ временно заблокирован. Повторите попытку позже');
                    }
                    default:
                        throw new CustomError(err, 'Возникла непредвиденная ошибка. Повторите попытку');
                }
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.loginWithEmailAndPassword(user).pipe(
            map((uid: string): void => {
                localStorage.setItem('uid', uid);
            }),
            catchError(err => {
                switch (err.code) {
                    case('auth/user-not-found'): {
                        throw new CustomError(err, 'Пользователь с указанной почтой не зарегистрирован');
                    }
                    case('auth/wrong-password'): {
                        throw new CustomError(err, 'Введен неверный пароль');
                    }
                    case('auth/invalid-credential'): {
                        throw new CustomError(err, 'Неверно указаны почта или пароль');
                    }
                    case('"auth/too-many-requests"'): {
                        throw new CustomError(err, 'Доступ временно заблокирован. Повторите попытку позже');
                    }
                    default:
                        throw new CustomError(err, 'Возникла непредвиденная ошибка. Повторите попытку');
                }
            })
        );
    }
}
