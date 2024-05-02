import {inject} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, map, Observable} from "rxjs";
import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {UserModel} from "../../models/user/user.model";
import {AuthService} from "../auth/auth.service";

export class UserService {

    private readonly _authService: AuthService = inject(AuthService);
    private readonly _firestore: AngularFirestore = inject(AngularFirestore);

    public getUserInfo(uid: string): Observable<UserModel> {
        return from(this._firestore.doc<IUserResponseModel>(`users/${uid}`).get()).pipe(
            map((obj: firebase.default.firestore.DocumentSnapshot<IUserResponseModel>) => {
                const data: IUserResponseModel = obj.data()!;

                return new UserModel(data);
            })
        );
    }

    public updateUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return from(this._firestore.doc<IUserResponseModel>(`users/${uid}`).update(user));
    }

    public updatePassword(email: string, password: string, newPassword: string): Observable<void> {
        return from(this._authService.loginWithEmailAndPassword({email, password})).pipe(
            map((obj: firebase.default.auth.UserCredential): void => {
                obj.user!.updatePassword(newPassword);
            })
        );
    }

    public updateEmail(email: string, password: string, newEmail: string): Observable<void> {
        return from(this._authService.loginWithEmailAndPassword({email, password})).pipe(
            map((obj: firebase.default.auth.UserCredential): void => {
                obj.user!.updateEmail(newEmail);
            })
        );
    }
}
