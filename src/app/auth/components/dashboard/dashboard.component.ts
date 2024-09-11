import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  message: string | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const successMessage = sessionStorage.getItem('achievementMessage');
    if (successMessage) {
      this.message = successMessage;
      sessionStorage.removeItem('achievementMessage'); // Clear the message after displaying
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/brag/create']);
  }

  navigateToView(): void {
    this.router.navigate(['/list-brag']); // Updated to match the route path
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }
}
