import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BragDocService } from '../../services/brag-doc.service';
import { BragDoc } from '../../models/brag-doc.model';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

// Register modules
Quill.register('modules/syntax', true);
hljs.registerLanguage('javascript', javascript);

@Component({
  selector: 'app-edit-brag',
  templateUrl: './edit-brag.component.html',
  styleUrls: ['./edit-brag.component.css']
})
export class EditBragComponent implements OnInit, AfterViewInit, OnDestroy {
  bragForm: FormGroup;
  bragId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  quillEditor: Quill | undefined;
  private observer: MutationObserver | undefined;

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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bragForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      date: [new Date().toISOString().split('T')[0], Validators.required],
      impact: ['', Validators.required]
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

  ngAfterViewInit(): void {
    const editorElement = document.getElementById('editor');
    if (editorElement) {
      this.quillEditor = new Quill(editorElement, {
        theme: 'snow',
        modules: this.editorModules
      });

      // MutationObserver for debugging
      this.observer = new MutationObserver(mutationsList => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList' || mutation.type === 'attributes') {
            console.log('DOM changes detected.');
          }
        }
      });

      const config = { attributes: true, childList: true, subtree: true };
      this.observer.observe(editorElement, config);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  loadBragDetails(bragId: number): void {
    this.bragDocService.getBragById(bragId).subscribe(
      (brag: BragDoc | undefined) => {
        if (brag) {
          this.bragForm.patchValue({
            title: brag.title,
            date: brag.date,
            description: brag.description,
            impact: brag.impact
          });

          if (this.quillEditor) {
            this.quillEditor.root.innerHTML = brag.description || '';
          }
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
    if (this.bragForm.valid && this.quillEditor && this.bragId !== null) {
      const bragData: BragDoc = this.bragForm.value;
      bragData.description = this.quillEditor.root.innerHTML;

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
