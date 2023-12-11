import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Emitters } from '../emitters/emitter';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {

  }

  login() {
    this.auth.login(this.email,this.password).subscribe(response => {
      localStorage.setItem("refreshToken", response.refreshToken)
      Emitters.isLoggedInEmitter.emit(true);
      this.auth.setAuthenticated(true);
      
    }, error => {
      Emitters.isLoggedInEmitter.emit(false);
      Swal.fire({
        title: "Error",
        text: error.error.message,
        icon: 'error'
      })
    })
  }

}
