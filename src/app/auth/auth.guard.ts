import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // Adjust the path if needed

@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  //constructor(private authService: AuthService, private router: Router) {}

 // canActivate(): boolean {
  //  if (this.authService.isLoggedIn()) {
   //   return true;
   // } else {
   //   this.router.navigate(['/login']); // Redirect to login if not logged in
  //    return false;
  //  }
 // }
  }
