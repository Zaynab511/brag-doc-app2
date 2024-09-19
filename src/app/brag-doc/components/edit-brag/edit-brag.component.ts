// src/app/brag-doc/components/edit-brag/edit-brag.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';

@Component({
  selector: 'app-edit-brag',
  templateUrl: './edit-brag.component.html',
  styleUrls: ['./edit-brag.component.css']
})
export class EditBragComponent implements OnInit {
  bragForm: FormGroup;
  bragId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private bragDocService: BragDocService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bragForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      tag: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.bragId = id;
        this.loadBragDetails(id);
      }
    });
  }

  loadBragDetails(bragId: number): void {
    this.bragDocService.getBragById(bragId).subscribe(
      (brag: BragDoc | undefined) => {
        if (brag) {
          this.bragForm.patchValue({
            title: brag.title,
            date: brag.date,
            description: brag.description,
            tag: brag.tag
          });
        } else {
          this.errorMessage = 'Brag document not found!';
        }
      },
      (error) => {
        this.errorMessage = 'Error fetching brag details';
        console.error(error);
      }
    );
  }

  onSubmit(): void {
    if (this.bragForm.valid && this.bragId !== null) {
      const bragData: BragDoc = this.bragForm.value;
      bragData.description = this.bragForm.get('description')?.value;

      this.bragDocService.updateBrag(this.bragId, bragData).subscribe(
        (response) => {
          if (response.success) {
            this.successMessage = 'Achievement updated successfully!';
            setTimeout(() => this.router.navigate(['/brags']), 2000);
          } else {
            this.errorMessage = 'Error updating achievement';
          }
        },
        (error) => {
          this.errorMessage = 'Error updating achievement';
          console.error(error);
        }
      );
    }
  }
}
