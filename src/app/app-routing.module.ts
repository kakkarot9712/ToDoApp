import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ModeshelpComponent } from './modeshelp/modeshelp.component';
import { TodoComponent } from './Todo/todo.component';

const routes: Routes = [
  {
    path: '', pathMatch: "full", redirectTo:'todo'
  },
  {
    path: 'todo', component: TodoComponent
  },
  {
    path: 'auth', component: AuthFormComponent
  },
  {
    path: 'modeshelp', component: ModeshelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
