import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { take, exhaustMap, map } from "rxjs/operators";
import * as crypto from 'crypto-js'

import { TodoModel } from "../Todo/todo.model";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class FirebaseStorageService implements OnInit{
    constructor(private http: HttpClient, private auth: AuthService){
    }

    ngOnInit(): void {   
    }

    putData(todolist: TodoModel[]){
        return this.http.put(`https://todoapp-ee61f-default-rtdb.firebaseio.com/${this.auth.username}.json`, todolist)
    }

    fetchData(){
        return this.http.get(`https://todoapp-ee61f-default-rtdb.firebaseio.com/${this.auth.username}.json`)
    }
}
