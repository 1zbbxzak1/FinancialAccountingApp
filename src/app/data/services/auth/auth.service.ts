import {inject, Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {from, map, Observable} from "rxjs";
import {IAuthDataRequestModel} from "../../request-models/auth/IAuthData.request-model";


@Injectable()
export class AuthService {
    private readonly _firebaseAuth: AngularFireAuth = inject(AngularFireAuth);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel): Observable<string> {
        return from(this._firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
            map((obj: firebase.default.auth.UserCredential) => {
                return obj.user!.uid;
            })
        );
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel): Observable<string> {
        return from(this._firebaseAuth.signInWithEmailAndPassword(user.email, user.password)).pipe(
            map((obj: firebase.default.auth.UserCredential) => {
                return obj.user!.uid;
            })
        );
    }
}
