import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {from, map, Observable, of} from "rxjs";
import {inject} from "@angular/core";

export class AuthGuard {

    private _router: Router = inject(Router);

    public canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const isAuthorized: string | null = localStorage.getItem("uid");

        if (state.url === '/welcome') {
            if (isAuthorized !== null) {
                from(this._router.navigate(["dashboard/main"])).pipe(
                    map((): boolean => false)
                );
            }
            return of(true);
        } else {
            if (isAuthorized === null) {
                from(this._router.navigate(["welcome"])).pipe(
                    map((): boolean => false)
                );
            }
            return of(true);
        }
    }
}
