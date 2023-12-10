import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { Emitters } from '../emitters/emitter';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.name, this.email, this.password).subscribe(response => {
      Emitters.isLoggedInEmitter.emit(true);
      this.auth.setAuthenticated(true);
      this.router.navigate(['dashboard'])

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
