import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { UserModel } from "./user.model";

export interface firebaseRes {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
    registered?: boolean
}

@Injectable({providedIn:'root'})

export class AuthService {
    loginDetails: BehaviorSubject<UserModel>
    constructor(private http: HttpClient, private router: Router){ 
        this.loginDetails = new BehaviorSubject<UserModel>(null)
    }
    logOutTimer = null
    apiKey = environment.apiKey
    signup(email: string, password: string){
        return this.http.post<firebaseRes>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        })
    }

    login(email: string, password: string){
        return this.http.post<firebaseRes>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(map((response)=>{
            this.handleAuth(response.email, response.localId, response.idToken, response.expiresIn)
        }))
    }

    autologin(){
        let loginDet: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiresIn: string
        } = JSON.parse(localStorage.getItem("loginDet"))
        if(loginDet !== null){
            let epocsecs = new Date(loginDet._tokenExpiresIn)
            let expiry = (epocsecs.getTime() - new Date().getTime())
            this.autoLogout(expiry)
            let userDet = new UserModel(loginDet.email, loginDet.id, loginDet._token, new Date(loginDet._tokenExpiresIn))
            this.loginDetails.next(userDet)
        }
    }

    logout(){
        this.loginDetails.next(null)
        if(this.logOutTimer){
            clearTimeout(this.logOutTimer)
            this.logOutTimer = null
        }
        localStorage.removeItem('loginDet')
        console.log("Logging out")
        console.log(this.logOutTimer)
        this.router.navigate(['auth'])
    }

    private autoLogout(expSecs: number){
        console.log(expSecs)
        this.logOutTimer = setTimeout(()=>{
            this.loginDetails.next(null)
            console.log("removing user")
            localStorage.removeItem('loginDet')
        }, expSecs)
    }

    private handleAuth(email: string, uId: string, token: string, expiry: string ){
        let expiresIn = new Date((new Date().getTime() + (+expiry*1000)))
        let user = new UserModel(email, uId, token, expiresIn)
        this.loginDetails.next(user)
        localStorage.setItem('loginDet', JSON.stringify(user))
        this.autoLogout(+expiry*1000)
    }
}