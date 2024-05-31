import {DestroyRef, inject, Injectable} from '@angular/core';
import {catchError, Observable} from "rxjs";
import {UserModel} from "../../models/user/user.model";
import {UserService} from "./user.service";
import {IUserRequestModel, UserModelToIUserRequestModel} from "../../request-models/user/IUser.request-model";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {CustomError} from "../../../global-error-handler/global-error-handler.service";


@Injectable()
export class UserManagerService {

    private readonly _userService: UserService = inject(UserService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    public createUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return this._userService.createUserInfo(uid, user).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось создать информацию о пользователе. Повторите попытку');
            })
        );
    }

    public getUserInfo(uid: string): Observable<UserModel> {
        return this._userService.getUserInfo(uid).pipe(
            catchError(err => {
                throw new CustomError(err, 'Информация о пользователе не найдена');
            })
        );
    }

    public updateUserInfo(uid: string, user: IUserRequestModel): Observable<void> {
        return this._userService.updateUserInfo(uid, user).pipe(
            catchError(err => {
                throw new CustomError(err, 'Не удалось обновить информацию о пользователе. Повторите попытку');
            })
        );
    }

    public updatePassword(email: string, password: string, newPassword: string): Observable<void> {
        return this._userService.updatePassword(email, password, newPassword).pipe(
            catchError(err => {
                switch (err.code) {
                    case('auth/weak-password'): {
                        throw new CustomError(err, 'Новый пароль ненадежный.');
                    }
                    case('auth/wrong-password'): {
                        throw new CustomError(err, 'Введен неверный пароль');
                    }
                    case('auth/invalid-credential'): {
                        throw new CustomError(err, 'Неверно указаны почта или пароль');
                    }
                    case('"auth/too-many-requests"'): {
                        throw new CustomError(err, 'Доступ временно заблокирован. Повторите попытку позже');
                    }
                    default:
                        throw new CustomError(err, 'Возникла непредвиденная ошибка. Повторите попытку');
                }
            })
        );
    }

    public updateEmail(email: string, password: string, newEmail: string): Observable<void> {
        return this._userService.updateEmail(email, password, newEmail).pipe(
            catchError(err => {
                switch (err.code) {
                    case('auth/email-already-in-use'): {
                        throw new CustomError(err, 'Указанная почта уже используется');
                    }
                    case('auth/wrong-password'): {
                        throw new CustomError(err, 'Введен неверный пароль');
                    }
                    case('auth/invalid-credential'): {
                        throw new CustomError(err, 'Неверно указаны почта или пароль');
                    }
                    case('"auth/too-many-requests"'): {
                        throw new CustomError(err, 'Доступ временно заблокирован. Повторите попытку позже');
                    }
                    default:
                        throw new CustomError(err, 'Возникла непредвиденная ошибка. Повторите попытку');
                }
            })
        );
    }

    public uploadUserPhoto(uid: string, image: File): void {
        const imageType: string = image.name.split('.').pop()!;
        const pathImage: string = `${uid}/userPhoto.${imageType}`;

        this._userService.uploadUserPhoto(image, pathImage)
            .pipe(
                takeUntilDestroyed(this._destroyRef),

                catchError(err => {
                    throw new CustomError(err, 'Не удалось загрузить изображение. Повторите попытку');
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

                                const userInfo: IUserRequestModel = UserModelToIUserRequestModel(userModel);

                                this.updateUserInfo(uid, userInfo);
                            }
                        );
                }
            );
    }
}
