import {ChangeDetectionStrategy, Component, Inject} from '@angular/core';
import {TuiDialogFormService} from "@taiga-ui/kit";
import {TuiDialogContext, TuiDialogService, TuiDialogSize} from "@taiga-ui/core";
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from "../../data/services/auth.service";
import {RegistrationRequestModelInterface} from "../../data/request-models/auth/registration.request-model.interface";
import {passwordMatchValidator} from "../../validators/auth.validator";
import {LoginRequestModelInterface} from "../../data/request-models/auth/login.request-model.interface";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [TuiDialogFormService],
})
export class HeaderComponent {

  isCollapsed: boolean = false;

  toggleSidebar(isCollapsed: boolean): void {
    this.isCollapsed = isCollapsed;
  }

  public form: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    repeatPassword: new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
  }, { validators: passwordMatchValidator });

  constructor(
    @Inject(TuiDialogFormService)
    private readonly dialogForm: TuiDialogFormService,
    @Inject(TuiDialogService)
    private readonly dialogs: TuiDialogService,
    private authService: AuthService,
    private router: Router
  ) {}

  openDialogLogIn(
    login: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    const closeable = this.dialogForm.withPrompt({
      label: 'Вы уверены?',
      data: {
        content: 'Ваши данные будут <strong>потеряны</strong>',
      },
    });

    this.dialogs.open(
      login,
      {
        size,
        data: {button: 'Войти'},
        closeable,
        dismissible: closeable
      })
      .subscribe({
      complete: () => {
        this.form.reset()
        this.dialogForm.markAsPristine();
      },
    });
  }

  openDialogRegistration(
    registration: PolymorpheusContent<TuiDialogContext>,
    size: TuiDialogSize
  ): void {
    const closeable = this.dialogForm.withPrompt({
      label: 'Вы уверены?',
      data: {
        content: 'Ваши данные будут <strong>потеряны</strong>',
      },
    });

    this.dialogs.open(
      registration,
      {
        size,
        data: {button: 'Зарегистрироваться'},
        closeable,
        dismissible: closeable
      })
      .subscribe({
        complete: () => {
          this.form.reset()
          this.dialogForm.markAsPristine();
        },
      });
  }

  logInUser(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (email && password) {
      const user: LoginRequestModelInterface = { email, password };

      this.authService.loginWithEmailAndPassword(user)
        .then(() => {
          console.log('LogIn successfully');
          this.dialogForm.markAsDirty();
        })
        .catch((error) => {
          console.error('LogIn failed:', error);
        });
    } else {
      console.error('Email and password are required');
    }
  }

  registrationNewUser(): void {
    const email = this.form.get('email')?.value;
    const password = this.form.get('password')?.value;

    if (email && password) {
      const user: RegistrationRequestModelInterface = { email, password };

      this.authService.registerWithEmailAndPassword(user)
        .then(() => {
          console.log('Registered successfully');
          this.dialogForm.markAsDirty();
        })
        .catch((error) => {
          console.error('Registration failed:', error);
        });
    } else {
      console.error('Email and password are required');
    }
  }
}
