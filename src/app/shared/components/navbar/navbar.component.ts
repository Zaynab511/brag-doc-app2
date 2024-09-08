import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) { }

  isAuthenticated(): boolean {
    // Check if user is authenticated
    return true; // Placeholder, update with actual authentication check
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
