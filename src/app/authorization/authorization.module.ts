import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
    ],
    imports: [
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiInputModule,
        FormsModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        CommonModule,
    ],
    exports: [
        LoginComponent,
        RegistrationComponent,
    ],
})
export class AuthorizationModule {
}
