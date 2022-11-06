import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
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
    username = null

    signup(email: string, password: string){
        return this.http.post<firebaseRes>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(tap({
            error: error => {
                this.handleError(error)
            }
        }))
    }

    login(email: string, password: string){
        return this.http.post<firebaseRes>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            map(response => {
                this.handleAuth(response.email, response.localId, response.idToken, response.expiresIn)
            }),
            catchError(err => {
                return this.handleError(err)
            })
        )
    }

    autologin(){
        let loginDet: {
            username: string
            email: string,
            id: string,
            _token: string,
            _tokenExpiresIn: string
        } = JSON.parse(localStorage.getItem("loginDet"))
        if(loginDet !== null){
            let epocsecs = new Date(loginDet._tokenExpiresIn)
            let expiry = (epocsecs.getTime() - new Date().getTime())
            this.autoLogout(expiry)
            let userDet = new UserModel(loginDet.username, loginDet.email, loginDet.id, loginDet._token, new Date(loginDet._tokenExpiresIn))
            this.username = loginDet.username
            this.loginDetails.next(userDet)
        }
    }

    logout(){
        this.loginDetails.next(null)
        if(this.logOutTimer){
            clearTimeout(this.logOutTimer)
            this.logOutTimer = null
        }
        this.username = null
        localStorage.removeItem('loginDet')
        this.router.navigate(['auth'])
    }

    private autoLogout(expSecs: number){
        this.logOutTimer = setTimeout(()=>{
            this.loginDetails.next(null)
            localStorage.removeItem('loginDet')
            this.username = null
        }, expSecs)
    }

    private handleAuth(email: string, uId: string, token: string, expiry: string ){
        let expiresIn = new Date((new Date().getTime() + (+expiry*1000)))
        this.username = email.slice(0, email.search('@'))
        let user = new UserModel(this.username, email, uId, token, expiresIn)
        this.loginDetails.next(user)
        localStorage.setItem('loginDet', JSON.stringify(user))
        this.autoLogout(+expiry*1000)
    }

    private handleError(errorRes: HttpErrorResponse){
        let errmsg = errorRes.error.error.message
        switch(errmsg){
            case 'EMAIL_EXISTS':
                return throwError(() => new Error('Email already exists! please use another email'));
            
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                return throwError(() => new Error('Unusual activities detected! probably too many failed attempts of login! try again after some times'));
            
            case 'EMAIL_NOT_FOUND':
                return throwError(() => new Error('Email address is not found! check your inputs or sign-up first!'));
        
            case 'INVALID_PASSWORD':
                return throwError(() => new Error('Entered password is invalid! check your inputs!'))
            
            case 'USER_DISABLED':
                return throwError(() => new Error('This account has been diabled by administrator! contact administrator for more details!'))
            
            default:
                return throwError(() => new Error('unknown error occured!'))
        }    
    }
}
