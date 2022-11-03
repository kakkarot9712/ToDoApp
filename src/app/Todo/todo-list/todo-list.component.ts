import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {

  constructor(private todoservice: TodoService) { }
  todolist: TodoModel[] = []
  listChangeSub!: Subscription;
  ngOnInit(): void {
    this.todolist = this.todoservice.getTodoList()
    this.listChangeSub = this.todoservice.todoListChanged.subscribe((newList: TodoModel[]) => {
      this.todolist = newList
    })
  }

  onDetails(index: number){
    this.todoservice.todoListDetails.next(index)
  }

  ngOnDestroy(): void {
    this.listChangeSub.unsubscribe()
  }
}
