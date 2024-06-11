import {ErrorHandler, NgModule} from '@angular/core';
import {BrowserModule, provideClientHydration} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AuthorizationModule} from "./children/authorization/authorization.module";
import {provideAnimationsAsync} from "@angular/platform-browser/animations/async";
import {TUI_SANITIZER} from "@taiga-ui/core";
import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {AppRoutingModule} from "./app-routing.module";
import {NgOptimizedImage} from "@angular/common";
import {DashboardModule} from "./children/dashboard/dashboard.module";
import {DataModule} from "./data/data.module";
import {ValidatorsModule} from "./validators/validators.module";
import {GlobalErrorHandlerService} from './global-error-handler/global-error-handler.service';

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
        ValidatorsModule,
        DashboardModule,
    ],
    providers: [
        {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
        provideClientHydration(),
        provideAnimationsAsync(),
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
