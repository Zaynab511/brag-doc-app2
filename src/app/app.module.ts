
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes'; // Ensure the correct path
import { AuthModule } from './auth/auth.module';
import { BragDocModule } from './brag-doc/brag-doc.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';
import { QuillConfigModule } from 'ngx-quill/config';
import { RouterModule } from '@angular/router'; // Ensure RouterModule is imported

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import hljs from 'highlight.js/lib/core';

@NgModule({
  declarations: [
    AppComponent,
    // Remove NavbarComponent from here as it's declared in SharedModule
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, // Make sure you import AppRoutingModule for routing
    AuthModule,
    BragDocModule,
    FormsModule,
    RouterModule,
    SharedModule, // Import SharedModule to use NavbarComponent and ExportService
    //QuillModule.forRoot(),  // Initialize QuillModule
    QuillModule.forRoot({
      modules: {
        syntax: true,
        toolbar: [
            ['bold', 'italic', 'underline'],        // toggled buttons
            [{ 'header': 1 }, { 'header': 2 }],     // custom button values
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }],               // text direction
            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'align': [] }],
            ['clean'],                                         // remove formatting button
            ['link', 'image', 'video'] ,
            ['code-block'], // Add code block for syntax highlighting                        // link and media
                                       // Clear formatting
        ],
         // Enable syntax highlighting
      },
      theme: 'snow'  // Set default theme
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
 // Add this line
})
export class AppModule { }
