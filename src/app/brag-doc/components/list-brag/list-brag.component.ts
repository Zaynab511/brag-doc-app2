import { Component, OnInit } from '@angular/core';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';

@Component({
  selector: 'app-list-brag',
  templateUrl: './list-brag.component.html',
  styleUrls: ['./list-brag.component.css']
})
export class ListBragComponent implements OnInit {
  brags: BragDoc[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private bragDocService: BragDocService) { }

  ngOnInit(): void {
    this.loadBrags();
  }

  loadBrags(): void {
    this.bragDocService.getAllBrags().subscribe(
      (brags: BragDoc[]) => {
        this.brags = brags;
      },
      (error) => {
        this.errorMessage = 'Error fetching achievements';
        console.error(error);
      }
    );
  }

  deleteBrag(id: number | undefined): void {
    if (id !== undefined) {
      this.bragDocService.deleteBrag(id).subscribe(
        (response) => {
          this.successMessage = response.message || 'Achievement deleted successfully!';
          this.loadBrags(); // Refresh the list after deletion
        },
        (error) => {
          this.errorMessage = 'Error deleting achievement';
          console.error(error);
        }
      );
    } else {
      console.error('ID is undefined');
    }
  }
}
