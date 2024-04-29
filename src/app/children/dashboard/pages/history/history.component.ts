import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-history',
    templateUrl: './history.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/history.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryComponent {

}
