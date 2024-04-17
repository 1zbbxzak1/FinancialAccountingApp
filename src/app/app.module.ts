import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from './components/header/header.component';
import {WelcomeComponent} from "./children/pages/welcome/welcome.component";
import {FooterComponent} from './components/footer/footer.component';
import {environment} from "../environments/environment";
import {AuthorizationModule} from "./authorization/authorization.module";
import {TuiActiveZoneModule} from "@taiga-ui/cdk";
import {TuiSidebarModule} from "@taiga-ui/addon-mobile";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {TUI_SANITIZER, TuiRootModule} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {IdentityService} from "./data/services/identity.service";
import {AuthService} from "./data/services/auth.service";
import {CardService} from "./data/services/card.service";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {CardManagerService} from "./data/services/card.manager.service";

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        WelcomeComponent,
        FooterComponent,
    ],
    imports: [
        BrowserModule,
        AuthorizationModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        AppRoutingModule,
        NgOptimizedImage,
        BrowserAnimationsModule,
        TuiActiveZoneModule,
        TuiSidebarModule,
        TuiRootModule,
    ],
    providers: [
        AuthService,
        IdentityService,
        CardService,
        CardManagerService,
        provideClientHydration(),
        provideAnimationsAsync(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
