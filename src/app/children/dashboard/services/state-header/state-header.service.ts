import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class StateHeaderService {
    constructor(
        private readonly _router: Router,
    ) {
    }

    protected findState(): string | undefined {
        const url: string = this._router.url;
        let state: string | undefined;
        if (url.includes('dashboard/main')) {
            state = 'Главная';
        } else if (url.includes('dashboard/history')) {
            state = 'История';
        } else if (url.includes('dashboard/user')) {
            state = 'Счета';
        } else if (url.includes('dashboard/cards')) {
            state = 'Карты';
        } else if (url.includes('dashboard/payments')) {
            state = 'Платежи';
        } else if (url.includes('dashboard/settings')) {
            state = 'Настройки';
        }
        return state;
    }

    protected navigateToSettings(): void {
        this._router.navigate(['dashboard/settings']);
    }

    protected logout(): void {
        localStorage.clear();
        this._router.navigate(['welcome']);
    }
}
