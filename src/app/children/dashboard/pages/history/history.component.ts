import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
