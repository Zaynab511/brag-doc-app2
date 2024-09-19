import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

    const newUser = {
      email: this.email,
      PasswordHash: this.password, // Ensure this matches backend logic
      Name: this.name,
      JobTitle: this.jobTitle,
      Industry: this.industry,
      Contact: this.contact
    };

    this.authService.register(newUser).subscribe({
      next: (response: any) => {
        if (response.message === 'User registered successfully.') {
          this.successMessage = response.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // Delay for user to see success message
        } else {
          this.errorMessage = response.message || 'Registration failed. Please try again.';
        }
      },
      error: (err) => {
        console.error('Registration error:', err);
        this.errorMessage = 'An error occurred. Please try again.';
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
