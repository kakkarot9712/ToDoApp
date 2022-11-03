import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { take, exhaustMap } from "rxjs/operators";
import { TodoModel } from "../Todo/todo.model";
import { AuthService } from "./auth.service";

@Injectable({providedIn:'root'})
export class FirebaseStorageService implements OnInit{
    constructor(private http: HttpClient, private auth: AuthService){
    }
    ngOnInit(): void {   
    }
    
    addToCloud(todo: TodoModel){
        return this.http.post('https://todoapp-ee61f-default-rtdb.firebaseio.com/todo.json', todo)
    }
    putData(todolist: TodoModel[]){
        return this.auth.loginDetails.pipe(take(1), exhaustMap(response => {
            return this.http.put('https://todoapp-ee61f-default-rtdb.firebaseio.com/todo.json', todolist, {
                params: new HttpParams().set('auth', response.token)
            })
        }))  
    }
}
