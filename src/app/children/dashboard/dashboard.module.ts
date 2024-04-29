import {NgModule} from "@angular/core";
import {MainComponent} from "./pages/main/main.component";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {CardComponent} from "./components/card/card.component";
import {UserComponent} from './pages/user/user.component';
import {HistoryComponent} from './pages/history/history.component';
import {CardsComponent} from './pages/cards/cards.component';
import {PaymentsComponent} from './pages/payments/payments.component';
import {TuiButtonModule, TuiDataListModule, TuiHostedDropdownModule, TuiRootModule} from "@taiga-ui/core";
import {TuiAccordionModule, TuiDataListDropdownManagerModule} from "@taiga-ui/kit";
import {SettingsComponent} from './pages/settings/settings.component';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";

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
    ],
    exports: [
        CardComponent,
    ],
    providers: []
})
export class DashboardModule {
}
