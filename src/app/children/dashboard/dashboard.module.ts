import {NgModule} from "@angular/core";
import {MainComponent} from "./pages/main/main.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CardComponent} from "./components/card/card.component";
import {UserComponent} from './pages/user/user.component';
import {HistoryComponent} from './pages/history/history.component';
import {CardsComponent} from './pages/cards/cards.component';
import {PaymentsComponent} from './pages/payments/payments.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiRootModule} from "@taiga-ui/core";
import {TuiAccordionModule, TuiDataListDropdownManagerModule, TuiTabsModule, TuiToggleModule} from "@taiga-ui/kit";
import {SettingsComponent} from './pages/settings/settings.component';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import { EditProfileComponent } from './pages/settings/pages/edit-profile/edit-profile.component';
import { PreferencesComponent } from './pages/settings/pages/preferences/preferences.component';
import { SecurityComponent } from './pages/settings/pages/security/security.component';
import { NavigationComponent } from './pages/settings/components/navigation/navigation.component';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "../../app-routing.module";
import { CheckDownloadDirective } from './pages/settings/pages/edit-profile/directive/check-download.directive';

@NgModule({
    declarations: [
        SidebarComponent,
        HeaderComponent,
        CardComponent,
        MainComponent,
        UserComponent,
        HistoryComponent,
        CardsComponent,
        PaymentsComponent,
        SettingsComponent,
        EditProfileComponent,
        PreferencesComponent,
        SecurityComponent,
        NavigationComponent,
        CheckDownloadDirective,
    ],
    imports: [
        NgOptimizedImage,
        NgIf,
        TuiRootModule,
        TuiAccordionModule,
        TuiHostedDropdownModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDataListDropdownManagerModule,
        
        TuiTabsModule,
        TuiToggleModule,
        ReactiveFormsModule,
        AppRoutingModule,
        TuiRootModule,
        TuiButtonModule,
        ReactiveFormsModule,
        NgOptimizedImage,
    ],
    exports: [
        CardComponent,
    ],
    providers: []
})
export class DashboardModule {
}
