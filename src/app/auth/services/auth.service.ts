import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private users: User[] = [
    { email: 'user@example.com', password: 'password123', name: 'John Doe', jobTitle: 'Developer', industry: 'Tech', contact: 'john.doe@example.com' }
  ];

  private loggedInUser: User | null = null;

  login(email: string, password: string): Observable<{ success: boolean, message: string }> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      if (user.password === password) {
        this.loggedInUser = user;
        return of({ success: true, message: '' });
      } else {
        return of({ success: false, message: 'Invalid credentials' });
      }
    }
    return of({ success: false, message: 'No user found with this email' });
  }

  register(user: User): Observable<boolean> {
    const existingUser = this.users.find(u => u.email === user.email);
    if (!existingUser) {
      this.users.push(user);
      return of(true);
    }
    return of(false);
  }

  forgotPassword(email: string): Observable<boolean> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      // Simulate password reset process
      return of(true);
    }
    return of(false);
  }

  isLoggedIn(): boolean {
    return !!this.loggedInUser;
  }

  getUserProfile(): User | null {
    return this.loggedInUser;
  }

  logout(): void {
    this.loggedInUser = null;
  }

  // Simulate Google and LinkedIn login
  loginWithGoogle(): Observable<boolean> {
    console.log('Simulating Google login');
    return of(true);
  }

  loginWithLinkedIn(): Observable<boolean> {
    console.log('Simulating LinkedIn login');
    return of(true);
  }
  
  getProfile(email: string): Observable<User | null> {
    const user = this.users.find(u => u.email === email);
    return of(user || null);
  }

  updateProfile(email: string, updatedData: Partial<User>): Observable<boolean> {
    const user = this.users.find(u => u.email === email);
    if (user) {
      Object.assign(user, updatedData);
      return of(true); // Update successful
    }
    return of(false); // Update failed
  }
}
