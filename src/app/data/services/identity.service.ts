import {inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {IRegistrationRequestModel} from "../request-models/auth/IRegistration.request-model";
import {catchError, map, Observable, of} from "rxjs";
import {ILoginRequestModel} from "../request-models/auth/ILogin.request-model";


export class IdentityService {
    authService : AuthService = inject(AuthService);

    public registerWithEmailAndPassword(user: IRegistrationRequestModel) : Observable<boolean>  {
        return this.authService.registerWithEmailAndPassword(user).pipe(
            map(() => true),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(false);
            })
        );
    }

    public loginWithEmailAndPassword(user: ILoginRequestModel) : Observable<boolean>  {
        return this.authService.loginWithEmailAndPassword(user).pipe(
            map(() => true),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(false);
            })
        );
    }
}
