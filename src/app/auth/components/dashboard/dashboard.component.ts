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
  brags: BragDoc[] = [];

  constructor(private bragDocService: BragDocService, private router: Router) { }

  ngOnInit(): void {
    this.loadBrags();
  }

  loadBrags(): void {
    this.bragDocService.getAllBrags().subscribe(
      (brags: BragDoc[]) => {
        this.brags = brags;
      },
      (error) => {
        console.error('Error fetching brags', error);
      }
    );
  }

  deleteBrag(id: number): void {
    if (id !== undefined) {
      this.bragDocService.deleteBrag(id).subscribe(
        () => {
          this.loadBrags(); // Refresh the list after deletion
        },
        (error) => {
          console.error('Error deleting brag', error);
        }
      );
    }
  }

  navigateToCreate(): void {
    this.router.navigate(['/brag/create']);
  }

  viewProfile(): void {
    this.router.navigate(['/profile']);
  }
}
