import {Injectable, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Injectable()
export class StateBarService implements OnInit {
    protected states: { [key: string]: boolean } = {
        isHomeClicked: false,
        isHistoryClicked: false,
        isUserClicked: false,
        isCardsClicked: false,
        isPaymentsClicked: false,
    };

    constructor(private readonly _router: Router) {
    }

    ngOnInit(): void {
        const savedStates: string | null = localStorage.getItem('sidebarStates');
        if (savedStates) {
            this.states = JSON.parse(savedStates);
        } else {
            this.toggleState('isHomeClicked');
            this._router.navigate(['dashboard/main']);
        }
    }

    public toggleState(stateName: string): void {
        const currentState: boolean = this.states[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.states) {
            if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                    this.states[key] = (key === stateName);
                }
            }
        }
        this.states[stateName] = true;
        localStorage.setItem('sidebarStates', JSON.stringify(this.states));
    }
}
