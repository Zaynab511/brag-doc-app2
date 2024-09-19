import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';

@Component({
  selector: 'app-create-brag',
  templateUrl: './create-brag.component.html',
  styleUrls: ['./create-brag.component.css']
})
export class CreateBragComponent implements OnInit {
  bragForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  editorConfig = {
    height: 300,
    menubar: true,
    plugins: 'link image code lists wordcount',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code | numlist bullist',
    content_css: 'https://www.tiny.cloud/css/codepen.min.css',
    setup: (editor: any) => {
      editor.on('change', () => {
        this.bragForm.get('description')?.setValue(editor.getContent());
      });
    }
  };

  constructor(
    private fb: FormBuilder,
    private bragDocService: BragDocService,
    private router: Router
  ) {
    this.bragForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      tag: ['', Validators.required]  // Replacing 'impact' with 'tag'
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.bragForm.valid) {
      const bragData: BragDoc = this.bragForm.value;

      this.bragDocService.createBrag(bragData).subscribe(
        (response) => {
          this.successMessage = response.message || 'Achievement created successfully!';
          setTimeout(() => this.router.navigate(['/brags']), 2000);
        },
        (error) => {
          this.errorMessage = 'Error creating achievement';
          console.error(error);
        }
      );
    }
  }
}
