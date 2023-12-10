import { Injectable, inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  class PermissionsService {
  
    constructor(private router: Router, private auth: AuthService) {

        
        

    }
  
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        var isAuthenticated = false;
        this.auth.isAuthenticated.pipe(map(isAuth => {
            isAuthenticated = isAuth;
        }))

        if(isAuthenticated) return true; 
        else {
            this.router.navigate(['/login']);
            return false; 
        }
    }
  }
  
  export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    return inject(PermissionsService).canActivate(next, state);
  }
  