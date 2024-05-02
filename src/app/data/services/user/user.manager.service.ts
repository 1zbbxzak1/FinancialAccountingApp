import {inject} from '@angular/core';
import {catchError, NEVER, Observable} from "rxjs";
import {UserModel} from "../../models/user/user.model";
import {UserService} from "./user.service";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";

export class UserManagerService {

    private readonly _userService: UserService = inject(UserService);

    public getUserInfo(uid: string): Observable<UserModel> {
        return this._userService.getUserInfo(uid).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public updateUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return this._userService.updateUserInfo(uid, user).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public updatePassword(email: string, password: string, newPassword: string): Observable<void> {
        return this._userService.updatePassword(email, password, newPassword).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public updateEmail(email: string, password: string, newEmail: string): Observable<void> {
        return this._userService.updateEmail(email, password, newEmail).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }
}
