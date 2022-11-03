import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  isLoginMode = true
  isLoading = false
  ngOnInit(): void {
  }

  switchMode(){
    this.isLoginMode = !this.isLoginMode
  }

  onSubmit(form: NgForm){
    this.isLoading = true
    if(this.isLoginMode){
      this.auth.login(form.value.email, form.value.password).subscribe(()=>{
        this.router.navigate(['todo'])
        this.isLoading = false
      })
    }
    else{
      this.auth.signup(form.value.email, form.value.password).subscribe(()=>{
        alert("sign up successfull")
        this.isLoginMode = true
        this.isLoading = false
      })
    }
  }
}
