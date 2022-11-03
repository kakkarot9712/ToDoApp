import { Component, ElementRef, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {

  isLoggedin = false
  constructor(private auth: AuthService) { }

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
}
