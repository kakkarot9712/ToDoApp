import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component'
import { HeaderComponent } from './header/header.component';
import { TodoComponent } from './Todo/todo.component';
import { TodoListComponent } from './Todo/todo-list/todo-list.component';
import { TodoDetailsComponent } from './Todo/todo-list/todo-details/todo-details.component';
import { TodoFormComponent } from './Todo/todo-form/todo-form.component';

import { DropDownDirective } from './shared/dropdown.directive';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ModeshelpComponent } from './modeshelp/modeshelp.component';
import { AuthInterceptor } from './shared/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TodoComponent,
    TodoListComponent,
    TodoDetailsComponent,
    DropDownDirective,
    TodoFormComponent,
    AuthFormComponent,
    ModeshelpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
