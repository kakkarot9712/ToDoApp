import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs';
import { TodoModel } from '../todo.model';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit, OnDestroy {
  detailSub!: Subscription
  editMode = false;
  editIndex = -1;
  editSub!: Subscription
  name: string = ""
  description: string = ""
  details: string = ""
  isImp: boolean = false
  constructor(private todoservice: TodoService) { }

  ngOnInit(): void {
    this.editSub = this.todoservice.todoListEdit.subscribe(index=>{
      this.editIndex = index
      let editModel = this.todoservice.getTodoModel(index);
      this.editMode = true;
      this.name = editModel.name
      this.description = editModel.description
      this.details = editModel.details
      this.isImp = editModel.isImportant
    })
    this.detailSub = this.todoservice.todoListDetails.subscribe(index=>{
      if(this.editIndex != index){
        this.editMode = false
        this.clearRes()
      }
    })
  }
  onSubmit(form: NgForm){
    let newModel: TodoModel = {
        name: form.value.name,
        description: form.value.description,
        details: form.value.details,
        isImportant: form.value.important,
        isDone: false
    }
    if(this.editMode){
      this.todoservice.editModel(this.editIndex, newModel)
    }
    else{
      this.todoservice.createModel(newModel)
    }
    form.reset()
  }

  clearRes(){
    this.name = ""
    this.description = ""
    this.details = ""
    this.isImp = false
  }

  onCancel(){
    this.clearRes()
    this.editIndex = -1
    this.editMode = false
  }

  onDelete(){
    this.todoservice.deleteModel(this.editIndex)
    this.editMode = false
    this.clearRes()
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe()
    this.detailSub.unsubscribe()
  }
}
