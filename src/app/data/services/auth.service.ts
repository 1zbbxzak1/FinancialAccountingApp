import { inject } from '@angular/core';
import { AngularFireAuth } from  '@angular/fire/compat/auth';
import { from, Observable } from "rxjs";
import {IAuthDataRequestModel} from "../request-models/auth/IAuthData.request-model";


export class AuthService {
    private readonly dataBase: AngularFireAuth = inject(AngularFireAuth);

    public registerWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<firebase.default.auth.UserCredential> {
        return from(this.dataBase.createUserWithEmailAndPassword(user.email, user.password));
    }

    public loginWithEmailAndPassword(user: IAuthDataRequestModel) : Observable<firebase.default.auth.UserCredential> {
        return from(this.dataBase.signInWithEmailAndPassword(user.email, user.password));
    }
}
