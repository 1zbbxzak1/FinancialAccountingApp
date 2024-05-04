import {inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {catchError, map, NEVER, Observable} from "rxjs";
import {IAuthDataRequestModel} from "../../request-models/auth/IAuthData.request-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {UserManagerService} from "../user/user.manager.service";
import {UserMapper} from "../../mappers/user/user.mapper";
import {AngularFireStorage} from "@angular/fire/compat/storage";


export class IdentityService {
    private readonly _authService: AuthService = inject(AuthService);
    private readonly _storage: AngularFireStorage = inject(AngularFireStorage);
    private readonly _userManager: UserManagerService = inject(UserManagerService);
    private readonly _userMapper: UserMapper = inject(UserMapper);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.registerWithEmailAndPassword(user).pipe(
            map((uid: string): void => {
                localStorage.setItem('uid', uid);

                const userInfo: IUserRequestModel = this._userMapper.ParamsToIUserRequestModel(user.email, false);

                this._userManager.createUserInfo(uid, userInfo);
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.loginWithEmailAndPassword(user).pipe(
            map((uid: string): void => {
                localStorage.setItem('uid', uid);
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }
}
