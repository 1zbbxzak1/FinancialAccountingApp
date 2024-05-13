import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-cards',
    templateUrl: './cards.component.html',
    styleUrl: './styles/cards.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardsComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
}
