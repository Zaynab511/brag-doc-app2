// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes'; // Ensure the correct path
import { AuthModule } from './auth/auth.module';
import { BragDocModule } from './brag-doc/brag-doc.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { EditorModule,TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { RouterModule } from '@angular/router'; // Ensure RouterModule is imported

@NgModule({
  declarations: [
    AppComponent
    // Remove NavbarComponent from here as it's declared in SharedModule
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule, // Make sure you import AppRoutingModule for routing
    AuthModule,
    BragDocModule,
    FormsModule,
    HttpClientModule, // add this line
    RouterModule,
    SharedModule, // Import SharedModule to use NavbarComponent and ExportService
    EditorModule // Import TinyMCE EditorModule
  ],
  providers: [
    {provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
