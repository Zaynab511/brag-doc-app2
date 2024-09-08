import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Import FormsModule and ReactiveFormsModule
import { RouterModule } from '@angular/router'; // Import RouterModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule

import { ListBragComponent } from './components/list-brag/list-brag.component';
import { CreateEditBragComponent } from './components/create-edit-brag/create-edit-brag.component';
import { BragDocService } from './services/brag-doc.service'; // Correct import path

@NgModule({
  declarations: [
    ListBragComponent,
    CreateEditBragComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add ReactiveFormsModule here
    FormsModule, // Add FormsModule here
    RouterModule // Add RouterModule here (useful if there are child routes)
    // HttpClientModule is typically imported in AppModule, not feature modules.
  ],
  providers: [
    BragDocService // Provide BragDocService
  ],
  exports: [
    ListBragComponent,
    CreateEditBragComponent
  ]
})
export class BragDocModule { }
