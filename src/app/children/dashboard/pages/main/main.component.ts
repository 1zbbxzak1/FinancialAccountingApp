import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrl: './styles/main.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent {
    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;

    constructor() {
    }
}
