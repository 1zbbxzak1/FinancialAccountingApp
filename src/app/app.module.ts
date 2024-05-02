import {NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AppComponent} from './app.component';
import {environment} from "../environments/environment";
import {AuthorizationModule} from "./children/authorization/authorization.module";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AppRoutingModule} from "./app-routing.module";
import {NgOptimizedImage} from "@angular/common";
import {DashboardModule} from "./children/dashboard/dashboard.module";
import {DataModule} from "./data/data.module";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgOptimizedImage,
        AuthorizationModule,
        DataModule,
        DashboardModule,
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
