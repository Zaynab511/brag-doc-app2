import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';
import Quill from 'quill'; // Import Quill
import 'quill/dist/quill.snow.css'; // Import the snow theme
import hljs from 'highlight.js/lib/core'; // Import highlight.js core
import javascript from 'highlight.js/lib/languages/javascript'; // Import specific language

// Register syntax highlighting for Quill
Quill.register('modules/syntax', true);

// Register language for highlight.js
hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-create-edit-brag',
  templateUrl: './create-edit-brag.component.html',
  styleUrls: ['./create-edit-brag.component.css']
})
export class CreateEditBragComponent implements OnInit {
  bragForm: FormGroup;
  isEditMode = false;
  bragId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';

  // Quill editor toolbar configuration with syntax highlighting
  editorModules = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value, // Function for highlighting
    },
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
      [{ 'direction': 'rtl' }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      ['clean'],
      ['link', 'image', 'video']
    ]
  };

  ngAfterViewInit() {
    const quillEditor = new Quill('#editor', {
      theme: 'snow',
      modules: this.editorModules
    });
  }
  
  constructor(
    private fb: FormBuilder,
    private bragDocService: BragDocService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bragForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      impact: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.bragId = id;
        this.isEditMode = true;
        this.loadBragDetails(id);
      }
    });
  }

  loadBragDetails(bragId: number): void {
    this.bragDocService.getBragById(bragId).subscribe(
      (brag: BragDoc | undefined) => {
        if (brag) {
          this.bragForm.patchValue(brag);
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
    if (this.bragForm.valid) {
      const bragData: BragDoc = this.bragForm.value;

      if (this.isEditMode) {
        if (this.bragId !== null) {
          this.bragDocService.updateBrag(this.bragId, bragData).subscribe(
            () => {
              this.successMessage = 'Achievement updated successfully!';
              setTimeout(() => this.router.navigate(['/brags']), 2000);
            },
            (error) => {
              this.errorMessage = 'Error updating achievement';
              console.error(error);
            }
          );
        }
      } else {
        this.bragDocService.createBrag(bragData).subscribe(
          () => {
            this.successMessage = 'Achievement created successfully!';
            setTimeout(() => this.router.navigate(['/dashboard']), 2000);
          },
          (error) => {
            this.errorMessage = 'Error creating achievement';
            console.error(error);
          }
        );
      }
    } else {
      this.errorMessage = 'Please fill out all required fields';
    }
  }
}
