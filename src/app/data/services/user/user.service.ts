import {inject, Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {from, map, Observable} from "rxjs";
import {IUserResponseModel} from "../../response-models/user/IUser.response-model";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {UserModel} from "../../models/user/user.model";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Injectable()
export class UserService {

    private readonly _firestore: AngularFirestore = inject(AngularFirestore);
    private readonly _storage: AngularFireStorage = inject(AngularFireStorage);
    private readonly _firebaseAuth: AngularFireAuth = inject(AngularFireAuth);

    public createUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return from(this._firestore.doc<IUserRequestModel>(`users/${uid}`).set(user));
    }

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
        return from(this._firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((obj: firebase.default.auth.UserCredential): void => {
                obj.user!.updatePassword(newPassword);
            })
        );
    }

    public updateEmail(email: string, password: string, newEmail: string): Observable<void> {
        return from(this._firebaseAuth.signInWithEmailAndPassword(email, password)).pipe(
            map((obj: firebase.default.auth.UserCredential): void => {
                obj.user!.updateEmail(newEmail);
            })
        );
    }

    public uploadUserPhoto(image: File, path: string): Observable<string> {
        return from(this._storage.upload(path, image).task.snapshot.ref.getDownloadURL());
    }
}
