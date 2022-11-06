import { Injectable, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { TodoModel } from "./todo.model";

@Injectable({providedIn:'root'})
export class TodoService implements OnInit{
    private todolist: TodoModel[] = []
    todoListChanged = new Subject<TodoModel[]>()
    todoListDetails = new Subject<number>()
    todoListEdit = new Subject<number>()
    TodoModelDeleted = new Subject<number>()

    constructor(){}

    ngOnInit(): void {
    }
    
    autoLogin(){
        let parsedData = JSON.parse(localStorage.getItem("ToDoData"))
        if (parsedData){
            this.todolist = parsedData
        }
    }

    private passChanges(){
        this.todoListChanged.next(this.todolist.slice())
        localStorage.setItem("ToDoData", JSON.stringify(this.todolist))
    }
    
    getTodoList(){
        return this.todolist.slice()
    }

    setTodoList(list: TodoModel[]){
        this.todolist = list
        this.passChanges()
    }

    getTodoModel(index: number){
        return this.todolist[index]
    }

    ModifyTodoModel(index: number, newModel: TodoModel){
        this.todolist[index] = newModel
        this.passChanges()
    }

    deleteModel(index: number){
        this.todolist.splice(index, 1)
        this.TodoModelDeleted.next(index)
        this.passChanges()
    }
    
    editModel(index: number, editModel: TodoModel){
        this.todolist[index] = editModel
        this.passChanges()
    }

    createModel(newModel: TodoModel){
        this.todolist.push(newModel);
        this.passChanges()
    }

    toggleIsImp(index: number){
        this.todolist[index].isImportant = !this.todolist[index].isImportant
        this.passChanges()
    }

    toggleIsDone(index: number){
        this.todolist[index].isDone = !this.todolist[index].isDone
        this.passChanges()
    }
}
