import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

Quill.register('modules/syntax', true);
hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-create-brag',
  templateUrl: './create-brag.component.html',
  styleUrls: ['./create-brag.component.css']
})
export class CreateBragComponent implements OnInit, AfterViewInit {
  bragForm: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';
  quillEditor: Quill | undefined;

  editorModules = {
    syntax: {
      highlight: (text: string) => hljs.highlightAuto(text).value,
    },
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image', 'video']
    ]
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
      impact: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const editorElement = document.getElementById('editor');
    if (editorElement) {
      this.quillEditor = new Quill(editorElement, {
        theme: 'snow',
        modules: this.editorModules
      });
    }
  }

  onSubmit(): void {
    if (this.bragForm.valid && this.quillEditor) {
      const bragData: BragDoc = this.bragForm.value;
      bragData.description = this.quillEditor.root.innerHTML;

      this.bragDocService.createBrag(bragData).subscribe(
        (response) => {
          if (response.success) {
            this.successMessage = 'Achievement created successfully!';
            setTimeout(() => this.router.navigate(['/brags']), 2000);
          } else {
            this.errorMessage = 'Error creating achievement';
          }
        },
        (error) => {
          this.errorMessage = 'Error creating achievement';
          console.error(error);
        }
      );
    }
  }
}
