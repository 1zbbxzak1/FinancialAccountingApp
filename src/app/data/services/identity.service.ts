import {inject} from '@angular/core';
import {AuthService} from "./auth.service";
import {catchError, map, Observable, of} from "rxjs";
import {IAuthDataRequestModel} from "../request-models/auth/IAuthData.request-model";
import {IUserResponseModel} from "../response-models/auth/IUser.response-model";
import {CardService} from "./card.service";


export class IdentityService {
    private readonly authService : AuthService = inject(AuthService);
    private readonly cardService: CardService = inject(CardService);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<IUserResponseModel | undefined>  {
        return this.authService.registerWithEmailAndPassword(user).pipe(
            map((userCredential: firebase.default.auth.UserCredential) => {
                if (userCredential.user !== null) {
                    const userModel: IUserResponseModel = { uid: userCredential.user.uid };
                    localStorage.setItem('uid', userCredential.user.uid);

                    return userModel;
                }
                return undefined;
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<IUserResponseModel | undefined>  {
        return this.authService.loginWithEmailAndPassword(user).pipe(
            map((userCredential: firebase.default.auth.UserCredential) => {
                if (userCredential.user !== null) {
                    const userModel: IUserResponseModel = { uid: userCredential.user.uid };
                    localStorage.setItem('uid', userCredential.user.uid);

                    return userModel;
                }
                return undefined;
            }),
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return of(undefined);
            })
        );
    }
}
