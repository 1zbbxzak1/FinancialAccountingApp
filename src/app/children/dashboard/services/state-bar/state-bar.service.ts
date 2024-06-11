import {DestroyRef, Injectable} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {filter} from 'rxjs/operators';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Injectable()
export class StateBarService {
    protected states: { [key: string]: boolean } = {
        isHomeClicked: false,
        isHistoryClicked: false,
        isUserClicked: false,
        isCardsClicked: false,
        isPaymentsClicked: false,
    };

    constructor(
        private readonly _router: Router,
        private readonly _destroyRef: DestroyRef,
    ) {
        this.initStates();
        this._router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            takeUntilDestroyed(this._destroyRef)
        )
            .subscribe((): void => {
                this.initStates();
            });
    }

    private initStates(): void {
        const url: string = this._router.url;
        this.resetStates();
        if (url.includes('dashboard/main')) {
            this.states['isHomeClicked'] = true;
        } else if (url.includes('dashboard/history')) {
            this.states['isHistoryClicked'] = true;
        } else if (url.includes('dashboard/user')) {
            this.states['isUserClicked'] = true;
        } else if (url.includes('dashboard/cards')) {
            this.states['isCardsClicked'] = true;
        } else if (url.includes('dashboard/payments')) {
            this.states['isPaymentsClicked'] = true;
        }
    }

    private resetStates(): void {
        for (const key in this.states) {
            if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                this.states[key] = false;
            }
        }
    }
}
