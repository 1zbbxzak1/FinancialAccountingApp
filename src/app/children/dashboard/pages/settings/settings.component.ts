import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/settings.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
