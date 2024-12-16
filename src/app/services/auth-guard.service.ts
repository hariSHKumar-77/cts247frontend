import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "./user.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private userService: UserService, private router: Router) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        console.log(state.url);
        return this.checkLoggedIn(state.url);


    }

    // Here we will check if any user is logged in or not , if the user is not logged in 
    // then it should redirect us to login page else it should return value as true
    checkLoggedIn(url: string): boolean {

        if (!this.userService.isLoggedIn()) {
            this.router.navigate(['/login']);
            return false;
        }
        else {
            return true;
        }


        // this.authService.redirectToUrl = url;

    }





}
