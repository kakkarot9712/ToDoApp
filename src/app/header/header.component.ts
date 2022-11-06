import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { FirebaseStorageService } from '../shared/firebase-storage.service';
import { TodoModel } from '../Todo/todo.model';
import { TodoService } from '../Todo/todo.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLoggedin = false
  constructor(private auth: AuthService, private database: FirebaseStorageService, private todoservice: TodoService) { }

  ngOnInit(): void {
    this.auth.loginDetails.subscribe(response => {
      if (response !== null) {
        this.isLoggedin = true
        return
      }
      this.isLoggedin = false
    })
  }
  logout(){
    this.auth.logout()
  }

  pushToCloud(){
    this.database.putData(this.todoservice.getTodoList()).subscribe()
  }

  fetchFromCloud(){
    this.database.fetchData().subscribe((response: TodoModel[]) =>this.todoservice.setTodoList(response))
  }
}
