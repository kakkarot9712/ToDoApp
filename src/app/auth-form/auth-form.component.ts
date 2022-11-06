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
  loginMode = 'login'
  isLoading = null
  ngOnInit(): void {
  }

  switchMode(){
    this.loginMode = this.loginMode==='login'?'signup':'login'
  }

  onSubmit(form: NgForm){
    this.isLoading = true
    if(this.loginMode==='login'){
      this.auth.login(form.value.email, form.value.password).subscribe({
        next: () => {
          this.router.navigate(['todo'])
          this.isLoading = false
          form.reset()
        },
        error: error => {
          alert(error)
        }
      })
    }
    if(this.loginMode==='signup'){
      if(form.value.password !== form.value['confirm-password']){
        alert("confirm password and entered password does'nt match!, check your inputs!")
        return
      }
      this.auth.signup(form.value.email, form.value.password).subscribe({
        next: () => {
          alert("sign up successfull")
          form.reset()
        },
        error: error => {
          alert(error)
        }
      })
      this.loginMode = 'login'
      this.isLoading = false
    }
    
  }
}
