import {ActivatedRouteSnapshot, RouterStateSnapshot, Routes} from "@angular/router";
import {WelcomePage} from "./children/authorization/pages/welcome/welcome.page";
import {MainComponent} from "./children/dashboard/pages/main/main.component";
import {AuthGuard} from "./data/guards/auth.guard";
import {inject} from "@angular/core";

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
];
