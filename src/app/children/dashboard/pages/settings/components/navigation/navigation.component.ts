import {ChangeDetectionStrategy, Component, DestroyRef, Inject} from '@angular/core';
import {TuiAlertService} from '@taiga-ui/core';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './styles/navigation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  constructor(
    @Inject(TuiAlertService)
      private readonly alerts: TuiAlertService,
      private _router: Router,
      private _destroyRef: DestroyRef
  ) {}

  protected onClick(page: string) 
  {
    switch(page){
      case 'Изменить профиль':
        this._router.navigate(['dashboard/settings/editProfile']);
        break;
      case 'Предпочтения':
        this._router.navigate(['dashboard/settings/preferences']);
        break;
      case 'Конфиденциальность':
        this._router.navigate(['dashboard/settings/security']);
        break;
    }
  }
}
