import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from "@angular/router";
import {WelcomePage} from "./children/authorization/pages/welcome/welcome.page";
import {MainComponent} from "./children/dashboard/pages/main/main.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {inject} from "@angular/core";
import {HistoryComponent} from "./children/dashboard/pages/history/history.component";
import {UserComponent} from "./children/dashboard/pages/user/user.component";
import {CardsComponent} from "./children/dashboard/pages/cards/cards.component";
import {SettingsComponent} from "./children/dashboard/pages/settings/settings.component";
import {EditProfileComponent} from "./children/dashboard/pages/settings/pages/edit-profile/edit-profile.component";
import {PreferencesComponent} from "./children/dashboard/pages/settings/pages/preferences/preferences.component";
import {SecurityComponent} from "./children/dashboard/pages/settings/pages/security/security.component";

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
        path: "dashboard/settings",
        component: SettingsComponent,
        canActivate: [(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) => inject(AuthGuard).canActivate(router, state)],
        children: [
            {
                path: "",
                redirectTo: "editProfile",
                pathMatch: "full",
            },
            {
                path: "editProfile",
                component: EditProfileComponent,
                data: {animation: 'editProfile'}
            },
            {
                path: "preferences",
                component: PreferencesComponent,
                data: {animation: 'preferences'}
            },
            {
                path: "security",
                component: SecurityComponent,
                data: {animation: 'security'}
            }
        ]
    },
];
