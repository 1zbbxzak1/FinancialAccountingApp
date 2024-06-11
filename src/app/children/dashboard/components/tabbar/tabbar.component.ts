import {ChangeDetectionStrategy, Component} from '@angular/core';
import {StateBarService} from "../../services/state-bar/state-bar.service";

@Component({
    selector: 'app-tabbar',
    templateUrl: './tabbar.component.html',
    styleUrl: './styles/tabbar.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabbarComponent extends StateBarService {

}
