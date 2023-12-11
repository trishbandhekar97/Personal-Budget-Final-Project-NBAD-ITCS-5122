import { AuthService } from './services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Emitters } from './emitters/emitter';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{

  isLoggedIn: boolean = false; 
  private intervalId: any | null = null;

  constructor(private router: Router, private auth: AuthService) {
    this.auth.isAuthenticated.subscribe(isAuth => {
      this.isLoggedIn = isAuth;
      if(this.isLoggedIn) {
        this.router.navigate(['/dashboard'])
        this.startTokenRefreshInterval();
      } else {
        clearInterval(this.intervalId)
      }
    })
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }


  private startTokenRefreshInterval() {
    console.log("Working")
    this.intervalId = setInterval(() => this.showTokenRefreshPopup(), 40000);
  }


  private showTokenRefreshPopup() {
    console.log("Triggered")
    Swal.fire({
      title: 'Do you want to refresh your session?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.refreshToken();
      } else if(result.isDenied) {
        this.logout();
      }
    });
  }


  private refreshToken() {
    this.auth.refresh(localStorage.getItem('refreshToken')).subscribe(res => {
      Emitters.isLoggedInEmitter.emit(true);
      this.auth.setAuthenticated(true);
      localStorage.setItem("refreshToken", res.refreshToken)
    })
  }



  ngOnInit(): void {
    this.auth.checkAuth()
  }
  title = 'frontend';


  logout() {
    this.auth.logout().subscribe(res => {
      console.log(res);
      localStorage.removeItem("refreshToken")
      this.auth.setAuthenticated(false);
      if (this.intervalId) {
        clearInterval(this.intervalId);
      }
        this.router.navigate(['/'])
    })
  }
  

}
