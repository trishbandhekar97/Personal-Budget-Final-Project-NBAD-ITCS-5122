import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from './emitters/emitter';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private router: Router, private auth: AuthService) {
    this.auth.isAuthenticated.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if(this.isLoggedIn) this.router.navigate(['/dashboard'])
      else this.router.navigate(['/login'])
    })
  }

  


  ngOnInit(): void {
    this.auth.checkAuth()
  }
  title = 'frontend';


  logout() {
    this.auth.logout().subscribe(res => {
      console.log(res);
      this.auth.setAuthenticated(false);
        this.router.navigate(['/'])
    })
  }

}
