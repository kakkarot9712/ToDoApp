import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class AuthInterceptor implements HttpInterceptor{
    constructor(private auth: AuthService){
    }
    intercept(req: HttpRequest<any>, next: HttpHandler){
        return this.auth.loginDetails.pipe(take(1), exhaustMap(response=>{
            if (response && response.token){
                let modifiedReq = req.clone({
                    params: new HttpParams().set('auth', response.token)
                })
                return next.handle(modifiedReq)
            }
            return next.handle(req)
        }))
    }
}