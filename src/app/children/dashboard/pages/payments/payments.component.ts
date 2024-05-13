import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrl: './styles/payments.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
}
