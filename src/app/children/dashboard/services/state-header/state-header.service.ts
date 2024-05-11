import {Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class StateHeaderService {
    constructor(
        private readonly _router: Router,
    ) {
    }
    protected findState(): string | undefined {
        const savedStates: string | null = localStorage.getItem('sidebarStates');
        if (savedStates) {
            const parsedStates: { [key: string]: boolean } = JSON.parse(savedStates);
            for (const key in parsedStates) {
                if (parsedStates[key]) {
                    switch (key) {
                        case 'isHomeClicked':
                            return 'Главная';
                        case 'isHistoryClicked':
                            return 'История';
                        case 'isUserClicked':
                            return 'Счета';
                        case 'isCardsClicked':
                            return 'Карты';
                        case 'isPaymentsClicked':
                            return 'Платежи';
                        case 'Settings':
                            return 'Настройки';
                        default:
                            return undefined;
                    }
                }
            }
        }
        return undefined;
    }

    protected navigateToSettings(): void {
        localStorage.setItem('sidebarStates', JSON.stringify({Settings: true}));
        this._router.navigate(['dashboard/settings']);
    }

    protected logout(): void {
        localStorage.clear();
        this._router.navigate(['welcome']);
    }
}
