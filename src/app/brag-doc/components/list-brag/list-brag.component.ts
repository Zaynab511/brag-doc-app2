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
        console.error('Error fetching brags', error);
      }
    );
  }

  deleteBrag(id: number | undefined): void {
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
}
