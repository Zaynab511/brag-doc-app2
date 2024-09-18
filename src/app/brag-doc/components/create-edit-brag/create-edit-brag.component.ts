import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';

@Component({
  selector: 'app-create-edit-brag',
  templateUrl: './create-edit-brag.component.html',
  styleUrls: ['./create-edit-brag.component.css']
})
export class CreateEditBragComponent implements OnInit {
  bragForm: FormGroup;
  isEditMode = false;
  bragId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bragDocService: BragDocService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Updated form group to include 'impact'
    this.bragForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: [''],
      date: [new Date(), Validators.required],
      impact: ['', Validators.required] // Added the impact field
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.bragId = id;
        this.isEditMode = true;
        this.bragDocService.getBragById(id).subscribe((brag: BragDoc | undefined) => {
          if (brag) {
            this.bragForm.patchValue(brag);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.bragForm.valid) {
      const bragData: BragDoc = this.bragForm.value;
      if (this.isEditMode) {
        this.bragDocService.updateBrag(bragData).subscribe(() => {
          this.router.navigate(['/dashboard'], { queryParams: { msg: 'Achievement successfully updated' } });
        });
      } else {
        this.bragDocService.createBrag(bragData).subscribe(() => {
          this.router.navigate(['/dashboard'], { queryParams: { msg: 'Achievement successfully created' } });
        });
      }
    }
  }
}
