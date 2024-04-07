import {inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of} from "rxjs";
import {IAuthDataRequestModel} from "../request-models/auth/IAuthData.request-model";


export class IdentityService {
    authService : AuthService = inject(AuthService);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<boolean>  {
        return this.authService.registerWithEmailAndPassword(user).pipe(
            map(() => true),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(false);
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<boolean>  {
        return this.authService.loginWithEmailAndPassword(user).pipe(
            map(() => true),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(false);
            })
        );
    }
}
