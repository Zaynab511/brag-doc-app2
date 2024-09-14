import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BragDocService } from '../../../brag-doc/services/brag-doc.service';
import { BragDoc } from '../../../brag-doc/models/brag-doc.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // No need to load brags in the dashboard anymore
  }

  // Navigate to the create achievement screen
  navigateToCreate(): void {
    this.router.navigate(['/brag/create']);
  }

  // Navigate to the view achievements screen
  navigateToViewAchievements(): void {
    this.router.navigate(['/brags']); // Navigate to the list of achievements
  }

  // Navigate to the user profile screen
  viewProfile(): void {
    this.router.navigate(['/profile']);
  }

  // Show a success message
  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000); // Clear message after 3 seconds
  }

  // Show an error message
  showErrorMessage(message: string): void {
    this.errorMessage = message;
    setTimeout(() => {
      this.errorMessage = null;
    }, 3000); // Clear message after 3 seconds
  }
}
