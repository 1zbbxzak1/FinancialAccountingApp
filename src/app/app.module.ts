import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiButtonModule,
    TuiDialogModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {TuiInputModule, TuiInputPasswordModule} from "@taiga-ui/kit";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from './components/header/header.component';
import {WelcomeComponent} from "./children/pages/welcome/welcome.component";
import {FooterComponent} from './components/footer/footer.component';
import {environment} from "../environments/environment";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {LoginComponent} from './authorization/components/login/login.component';
import {RegistrationComponent} from './authorization/components/registration/registration.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomeComponent,
        FooterComponent,
        LoginComponent,
        RegistrationComponent,
    ],
    imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiInputModule,
        FormsModule,
        TuiButtonModule,
        ReactiveFormsModule,
        TuiInputPasswordModule,
        TuiTextfieldControllerModule,
        TuiActiveZoneModule,
        TuiSidebarModule,
    ],
    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
