import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from "@angular/router";
import {WelcomePage} from "./children/authorization/pages/welcome/welcome.page";
import {MainComponent} from "./children/dashboard/pages/main/main.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {inject} from "@angular/core";
import {HistoryComponent} from "./children/dashboard/pages/history/history.component";
import {UserComponent} from "./children/dashboard/pages/user/user.component";
import {CardsComponent} from "./children/dashboard/pages/cards/cards.component";
import {PaymentsComponent} from "./children/dashboard/pages/payments/payments.component";
import {SettingsComponent} from "./children/dashboard/pages/settings/settings.component";

export const routes: Routes = [
    {
        path: "",
        redirectTo: "dashboard/main",
        pathMatch: "full",
    },
    {
        path: "welcome",
        component: WelcomePage,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/main",
        component: MainComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/history",
        component: HistoryComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/user",
        component: UserComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/cards",
        component: CardsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/payments",
        component: PaymentsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
    {
        path: "dashboard/settings",
        component: SettingsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
    },
];
