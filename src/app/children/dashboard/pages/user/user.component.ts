import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './styles/user.master.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserComponent {

    protected readonly Capacitor: CapacitorGlobal = Capacitor;
}
