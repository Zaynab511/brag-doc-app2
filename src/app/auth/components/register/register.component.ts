import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = '';
  password = '';
  confirmPassword = '';
  name = '';
  jobTitle = '';
  industry = '';
  contact = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    const newUser: User = {
      email: this.email,
      password: this.password,
      name: this.name,
      jobTitle: this.jobTitle,
      industry: this.industry,
      contact: this.contact
    };

    this.authService.register(newUser).subscribe(success => {
      if (success) {
        this.successMessage = 'Registration successful. Please log in.';
        this.router.navigate(['/login']);
      } else {
        this.errorMessage = 'Registration failed. Email might already be in use.';
      }
    });
  }

  loginWithGoogle(): void {
    console.log('Logging in with Google');
  }

  loginWithLinkedIn(): void {
    console.log('Logging in with LinkedIn');
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
