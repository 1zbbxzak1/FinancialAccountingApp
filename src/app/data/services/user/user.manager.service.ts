import {DestroyRef, inject} from '@angular/core';
import {catchError, NEVER, Observable} from "rxjs";
import {UserModel} from "../../models/user/user.model";
import {UserService} from "./user.service";
import {IUserRequestModel} from "../../request-models/user/IUser.request-model";
import {UserMapper} from "../../mappers/user/user.mapper";
import {UserValidator} from "../../../validators/user/user.validator";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export class UserManagerService {

    private readonly _userService: UserService = inject(UserService);
    private readonly _userMapper: UserMapper = inject(UserMapper);
    private readonly _userValidator: UserValidator = inject(UserValidator);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    public createUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return this._userService.createUserInfo(uid, user).pipe(
            catchError(err => {
                console.error('An error occurred: ', err); // Заменить на ErrorHandler
                return NEVER;
            })
        );
    }

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

    public uploadUserPhoto(uid: string, image: File): void {
        if(!this._userValidator.userPhotoIsCorrect(image)) {
            throw new Error('UserPhoto incorrect!');
        }

        const imageType: string = image.name.split('.').pop()!;
        const pathImage: string = `${uid}/userPhoto.${imageType}`;

        this._userService.uploadUserPhoto(image, pathImage)
            .pipe(
                takeUntilDestroyed(this._destroyRef),

                catchError(err => {
                    console.error('An error occurred: ', err); // Заменить на ErrorHandler
                    return NEVER;
                }),
            )
            .subscribe(
                (photoURL: string): void => {
                    this.getUserInfo(localStorage.getItem('uid')!)
                        .pipe(
                            takeUntilDestroyed(this._destroyRef),
                        )
                        .subscribe(
                        (userModel: UserModel): void => {
                            userModel.photoURL = photoURL;

                            const userInfo: IUserRequestModel = this._userMapper.UserModelToIUserRequestModel(userModel);

                            this.updateUserInfo(uid, userInfo);
                        }
                    );
                }
            );
    }
}
