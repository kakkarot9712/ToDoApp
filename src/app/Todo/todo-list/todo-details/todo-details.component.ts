import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TodoModel } from '../../todo.model';
import { TodoService } from '../../todo.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent implements OnInit, OnDestroy {
  index = -1;
  detailsSubs!: Subscription;
  deleteSub!: Subscription;
  constructor(private todoservice: TodoService) { }
  todoModel!: TodoModel;
  ngOnInit(): void {
    this.detailsSubs = this.todoservice.todoListDetails.subscribe(index=>{
      this.index = index
      this.todoModel = this.todoservice.getTodoModel(index)
    })
    this.deleteSub = this.todoservice.TodoModelDeleted.subscribe(index=>{
      if(this.index === index){
        this.index = -1
      }
    })
  }

  toggleImp(){
    this.todoservice.toggleIsImp(this.index)
  }

  toggleDone(){
    this.todoservice.toggleIsDone(this.index)
  }

  onEdit(){
    this.todoservice.todoListEdit.next(this.index)
  }

  ngOnDestroy(): void {
    this.detailsSubs.unsubscribe()
    this.deleteSub.unsubscribe()
  }
}