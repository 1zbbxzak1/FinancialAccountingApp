import {ChangeDetectionStrategy, Component} from '@angular/core';
import {TuiSizeL, TuiSizeS} from "@taiga-ui/core";
import {StateHeaderService} from "../../services/state-header/state-header.service";
import {Capacitor, CapacitorGlobal} from "@capacitor/core";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './styles/header.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent extends StateHeaderService {
    protected dropdownOpen: boolean = false;
    protected size: TuiSizeL | TuiSizeS = 's';
    protected readonly Capacitor: CapacitorGlobal = Capacitor;
    protected readonly window: Window = window;
}
