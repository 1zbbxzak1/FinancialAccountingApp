import {inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {catchError, map, NEVER, Observable} from "rxjs";
import {IAuthDataRequestModel} from "../../request-models/auth/IAuthData.request-model";


export class IdentityService {
    private readonly _authService: AuthService = inject(AuthService);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.registerWithEmailAndPassword(user).pipe(
            map((userCredential: firebase.default.auth.UserCredential): void => {
                localStorage.setItem('uid', userCredential.user!.uid);
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel): Observable<void> {
        return this._authService.loginWithEmailAndPassword(user).pipe(
            map((userCredential: firebase.default.auth.UserCredential): void => {
                localStorage.setItem('uid', userCredential.user!.uid);
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }
}
