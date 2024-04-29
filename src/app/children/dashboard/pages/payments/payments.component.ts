import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-payments',
    templateUrl: './payments.component.html',
    styleUrls: ['../../styles/dashboard-styles.scss', './styles/payments.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentsComponent {

}
