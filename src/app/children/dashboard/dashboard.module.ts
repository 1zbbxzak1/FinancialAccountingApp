import {NgModule} from "@angular/core";
import {MainComponent} from "./pages/main/main.component";
import {CommonModule, CurrencyPipe, NgOptimizedImage} from "@angular/common";
import {CardComponent} from "./components/card/card.component";
import {UserComponent} from './pages/user/user.component';
import {HistoryComponent} from './pages/history/history.component';
import {CardsComponent} from './pages/cards/cards.component';
import {PaymentsComponent} from './pages/payments/payments.component';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiFormatNumberPipeModule,
    TuiHintModule,
    TuiHostedDropdownModule,
    TuiRootModule,
    TuiScrollbarModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TuiAccordionModule,
    TuiCarouselModule,
    TuiComboBoxModule,
    TuiDataListDropdownManagerModule,
    TuiDataListWrapperModule,
    TuiInputDateModule,
    TuiInputModule,
    TuiIslandModule,
    TuiSelectModule,
    TuiStringifyContentPipeModule,
    TuiTabsModule,
    TuiToggleModule
} from "@taiga-ui/kit";
import {SettingsComponent} from './pages/settings/settings.component';
import {HeaderComponent} from "./components/header/header.component";
import {SidebarComponent} from "./components/sidebar/sidebar.component";
import {EditProfileComponent} from './pages/settings/pages/edit-profile/edit-profile.component';
import {PreferencesComponent} from './pages/settings/pages/preferences/preferences.component';
import {SecurityComponent} from './pages/settings/pages/security/security.component';
import {NavigationComponent} from './pages/settings/components/navigation/navigation.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "../../app-routing.module";
import {CheckDownloadDirective} from './pages/settings/pages/edit-profile/directive/check-download.directive';
import {TabbarComponent} from "./components/tabbar/tabbar.component";
import {TuiTabBarModule} from "@taiga-ui/addon-mobile";
import {StateBarService} from "./services/state-bar/state-bar.service";
import {MyCardsComponent} from './components/my-cards/my-cards.component';
import {BalanceChartComponent} from './pages/history/components/balance-chart/balance-chart.component';
import {TuiAxesModule, TuiBarChartModule, TuiBarSetModule} from "@taiga-ui/addon-charts";
import {LastOperationsComponent} from "./pages/main/components/last-operations/last-operations.component";
import {DateFormatterPipe} from './pipes/date-formatter.pipe';
import {CardSelectionService} from "./services/my-cards/card-selection.service";
import {TransactionComponent} from './pages/user/components/transaction/transaction.component';
import {OperationChartComponent} from './pages/user/components/operation-chart/operation-chart.component';
import {CardOperationListComponent} from './pages/user/components/card-operation-list/card-operation-list.component';
import {CategoryComponent} from './pages/user/components/category/category.component';
import {OperationAccountingService} from "./services/operation/operation-accounting.service";
import {DynamicsComponent} from "./pages/main/components/dynamics/dynamics.component";

import {WeeklyActivityComponent} from "./pages/main/components/weekly-activity/weekly-activity.component";
import {ExpenseStatisticsComponent} from "./pages/main/components/expense-statistics/expense-statistics.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CardNotFoundComponent} from "./components/card-not-found/card-not-found.component";
import {CreateOperationComponent} from "./pages/history/components/create-operation/create-operation.component";
import {RecentOperationsComponent} from "./pages/history/components/recent-operations/recent-operations.component";
import {StatisticsCardsComponent} from './pages/cards/components/statistics-cards/statistics-cards.component';
import {AddCardComponent} from './pages/cards/components/add-card/add-card.component';

@NgModule({
    declarations: [
        DateFormatterPipe,
        SidebarComponent,
        TabbarComponent,
        HeaderComponent,
        CardComponent,

        MainComponent,
        LastOperationsComponent,
        WeeklyActivityComponent,
        ExpenseStatisticsComponent,
        DynamicsComponent,

        UserComponent,
        HistoryComponent,
        CreateOperationComponent,
        RecentOperationsComponent,

        CardNotFoundComponent,
        CardsComponent,
        PaymentsComponent,
        SettingsComponent,
        EditProfileComponent,
        PreferencesComponent,
        SecurityComponent,
        NavigationComponent,
        CheckDownloadDirective,
        MyCardsComponent,
        BalanceChartComponent,
        TransactionComponent,
        OperationChartComponent,
        CardOperationListComponent,
        CategoryComponent,
        StatisticsCardsComponent,
        AddCardComponent,
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        NgOptimizedImage,
        CurrencyPipe,
        FormsModule,

        BrowserAnimationsModule,
        TuiRootModule,
        TuiAccordionModule,
        TuiHostedDropdownModule,
        TuiButtonModule,
        TuiDataListModule,
        TuiDataListDropdownManagerModule,
        TuiTabBarModule,
        TuiTabsModule,
        TuiToggleModule,
        TuiCarouselModule,
        TuiIslandModule,
        TuiBarSetModule,
        TuiFormatNumberPipeModule,
        TuiAxesModule,
        TuiSelectModule,
        TuiDataListWrapperModule,
        TuiBarChartModule,
        TuiHintModule,
        TuiScrollbarModule,
        TuiTextfieldControllerModule,
        TuiInputModule,
        TuiComboBoxModule,
        TuiStringifyContentPipeModule,
        TuiInputDateModule,
    ],
    exports: [
        CardComponent,
        TabbarComponent,
    ],
    providers: [
        StateBarService,
        CardSelectionService,
        OperationAccountingService,
    ]
})
export class DashboardModule {
}
