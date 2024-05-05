import {DestroyRef, ErrorHandler, inject} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export class GlobalErrorHandlerService implements ErrorHandler {

    private readonly _alerts: TuiAlertService = inject(TuiAlertService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    handleError(error: any): void {
        if (error.code !== undefined)
            error = error.code;

        switch (error) {
            case('auth/email-already-in-use'): {
                this.showNotification('Указанная почта уже используется');
                break;
            }
            case('auth/user-not-found'): {
                this.showNotification('Пользователь с указанной почтой не зарегистрирован');
                break;
            }
            case('auth/wrong-password'): {
                this.showNotification('Введен неверный пароль');
                break;
            }
            case('auth/invalid-credential'): {
                this.showNotification('Неверно указаны почта или пароль');
                break;
            }
            case('"auth/too-many-requests"'): {
                this.showNotification('Доступ временно заблокирован. Повторите попытку позже');
                break;
            }
            case('card/not-created'): {
                this.showNotification('Не удалось создать карту. Повторите попытку');
                break;
            }
            case('card/not-found'): {
                this.showNotification('Запрашиваемой карты не существует');
                break;
            }
            case('card/not-in-collection'): {
                this.showNotification('Записи о картах не созданы');
                break;
            }
            case('operation/not-created'): {
                this.showNotification('Не удалось создать операцию. Повторите попытку');
                break;
            }
            case('operation/not-found'): {
                this.showNotification('Запрашиваемой операции не существует');
                break;
            }
            case('operation/card-not-found'): {
                this.showNotification('Записи об операциях карты отсутствуют');
                break;
            }
            case('payment/not-created'): {
                this.showNotification('Не удалось создать платеж. Повторите попытку');
                break;
            }
            case('payment/not-found'): {
                this.showNotification('Запрашиваемого платежа не существует');
                break;
            }
            case('payment/not-in-collection'): {
                this.showNotification('Запрашиваемого платежа не существует');
                break;
            }
            case('user/not-created'): {
                this.showNotification('Не удалось добавить информацию о пользователе');
                break;
            }
            case('user/not-found'): {
                this.showNotification('Информация о пользователе не найдена');
                break;
            }
            case('user/photo-not-upload!'): {
                this.showNotification('Не удалось загрузить изображение. Повторите попытку');
                break;
            }
            default: {
                break;
            }
        }
    }


    showNotification(message: string): void {
        this._alerts
            .open(message, {label: 'Ошибка!', status: 'error', autoClose: true})
            .pipe(
                takeUntilDestroyed(this._destroyRef),
            )
            .subscribe();
    }
}
