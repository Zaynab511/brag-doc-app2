import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { QuillModule } from 'ngx-quill'; // Import QuillModule

import { ListBragComponent } from './components/list-brag/list-brag.component';
import { CreateEditBragComponent } from './components/create-edit-brag/create-edit-brag.component';
import { BragDocService } from './services/brag-doc.service'; // Correct import path
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
@NgModule({
  declarations: [
    ListBragComponent,
    CreateEditBragComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    FormsModule, // Add FormsModule here
    RouterModule, // Add RouterModule here (useful if there are child routes)
    QuillModule.forRoot() // Add QuillModule here
  ],
  providers: [
    BragDocService // Provide BragDocService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line if necessary
  exports: [
    ListBragComponent,
    CreateEditBragComponent
  ]
})
export class BragDocModule { }
