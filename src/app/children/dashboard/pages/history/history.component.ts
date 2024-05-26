import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrl: './styles/history.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
    private readonly _changeDetectorRef: ChangeDetectorRef = inject(ChangeDetectorRef);

    constructor() {
        this._changeDetectorRef.markForCheck();
    }
}
