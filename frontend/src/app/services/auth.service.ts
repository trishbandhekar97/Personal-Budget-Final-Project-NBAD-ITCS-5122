import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, withRouterConfig } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  isAuthenticated: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { 
    this.checkAuth();
  }


  login(email: string, password:string) {
    return this.http.post<any>(environment.apiURL + 'login', {email, password}, { withCredentials: true});
  }

  register(name:string, email:string, password: string) {
    return this.http.post<any>(environment.apiURL + 'register', { name, email, password}, { withCredentials: true});
  }

  logout() {
    return this.http.post<any>(environment.apiURL + 'logout', {}, {withCredentials: true});
  }

  checkAuth() {
    this.http.get<any>(environment.apiURL + 'jwt-check', { withCredentials: true}).subscribe(res => {
      this.setAuthenticated(true);
    }, err => {
      this.setAuthenticated(false);
    })
  }

  setAuthenticated(isAuthenticated: boolean): void {
    this.isAuthenticatedSubject.next(isAuthenticated);
  }
  
}
