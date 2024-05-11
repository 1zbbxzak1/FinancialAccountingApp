import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/user.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
