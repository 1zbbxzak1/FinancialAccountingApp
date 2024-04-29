import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './styles/sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {

    protected states: { [key: string]: boolean } = {
        isHomeClicked: false,
        isHistoryClicked: false,
        isUserClicked: false,
        isCardsClicked: false,
        isPaymentsClicked: false,
    };

    constructor(
        private readonly _router: Router
    ) {
    }

    ngOnInit(): void {
        const savedStates: string | null = localStorage.getItem('sidebarStates');
        if (savedStates) {
            this.states = JSON.parse(savedStates);
        } else {
            this.toggleState('isHomeClicked', 'dashboard/main');
        }
    }

    protected toggleState(stateName: string, router: string): void {
        const currentState: boolean = this.states[stateName];
        if (currentState) {
            return;
        }
        for (const key in this.states) {
            if (Object.prototype.hasOwnProperty.call(this.states, key)) {
                if (key !== stateName) {
                    this.states[key] = false;
                }
            }
        }
        this.states[stateName] = true;
        localStorage.setItem('sidebarStates', JSON.stringify(this.states));

        this._router.navigate([router]);
    }
}
