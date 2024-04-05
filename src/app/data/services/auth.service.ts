import { inject } from '@angular/core';
import { AngularFireAuth } from  '@angular/fire/compat/auth';
import { IRegistrationRequestModel } from "../request-models/auth/IRegistration.request-model";
import { ILoginRequestModel } from "../request-models/auth/ILogin.request-model";
import { from, Observable } from "rxjs";


export class AuthService {
    dataBase: AngularFireAuth = inject(AngularFireAuth);

    public registerWithEmailAndPassword(user: IRegistrationRequestModel) : Observable<firebase.default.auth.UserCredential> {
        return from(this.dataBase.createUserWithEmailAndPassword(user.email, user.password));
    }

    public loginWithEmailAndPassword(user: ILoginRequestModel) : Observable<firebase.default.auth.UserCredential> {
        return from(this.dataBase.signInWithEmailAndPassword(user.email, user.password));
    }
}
