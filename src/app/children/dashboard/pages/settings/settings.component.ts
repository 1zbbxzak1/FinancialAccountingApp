import {ChangeDetectionStrategy, Component} from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";
import { slideInAnimation } from './animations/slideInAnimation.animation';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrl: './styles/settings.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [slideInAnimation]
})
export class SettingsComponent {

    constructor(private contexts: ChildrenOutletContexts) {}

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
}
