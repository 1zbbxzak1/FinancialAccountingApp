import {DestroyRef, ErrorHandler, inject} from '@angular/core';
import {TuiAlertService} from "@taiga-ui/core";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

export class CustomError extends Error {
    constructor(error: Error, customMessage: string) {
        super(error.message);

        this.message = customMessage;
    }
}

export class GlobalErrorHandlerService implements ErrorHandler {

    private readonly _alerts: TuiAlertService = inject(TuiAlertService);
    private readonly _destroyRef: DestroyRef = inject(DestroyRef);

    handleError(error: any): void {

        if (error instanceof CustomError)
            this.showNotification(error.message);

        return;
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
