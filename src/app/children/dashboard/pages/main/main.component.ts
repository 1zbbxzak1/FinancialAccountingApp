import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/main.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class MainComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
