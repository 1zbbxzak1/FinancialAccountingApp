import {NgModule} from "@angular/core";
import {LoginComponent} from "./components/login/login.component";
import {RegistrationComponent} from "./components/registration/registration.component";
import {
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiModeModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {TuiDialogFormService, TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {WelcomePage} from "./pages/welcome/welcome.page";
import {HeaderComponent} from "./components/header/header.component";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {FooterComponent} from "./components/footer/footer.component";

@NgModule({
    declarations: [
        LoginComponent,
        RegistrationComponent,
        WelcomePage,
        HeaderComponent,
        FooterComponent,
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
        TuiActiveZoneModule,
        TuiSidebarModule,
        NgOptimizedImage,
        TuiModeModule,
    ],
    exports: [
        LoginComponent,
        RegistrationComponent,
    ],
    providers: [
        TuiDialogFormService,
    ]
})

export class AuthorizationModule {
}
