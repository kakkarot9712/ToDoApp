import { Injectable, OnInit } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})

export class AuthGuard implements OnInit, CanActivate {
    token: string
    constructor(private router: Router, private auth: AuthService){
        this.auth.loginDetails.subscribe(response=>{
            if(response){
                this.token = response.token
                return
            }
            this.token = null
        })
    }

    ngOnInit(): void {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        if(this.token===null){
            return true
        }
        let redirectUrl = this.router.parseUrl('todo')
        return redirectUrl
    }
}