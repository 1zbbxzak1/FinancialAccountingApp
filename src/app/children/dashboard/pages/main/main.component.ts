import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './styles/main.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent implements OnInit {
    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;

    constructor(
        private readonly _changeDetectorRef: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._changeDetectorRef.detectChanges();
    }
}
