
// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routes'; // Ensure the correct path
import { AuthModule } from './auth/auth.module';
import { BragDocModule } from './brag-doc/brag-doc.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { QuillModule } from 'ngx-quill';

import { RouterModule } from '@angular/router'; // Ensure RouterModule is imported
@NgModule({
  declarations: [
    AppComponent
    // Remove NavbarComponent from here as it's declared in SharedModule
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule, // Make sure you import AppRoutingModule for routing
    AuthModule,
    BragDocModule,
    RouterModule,
    QuillModule.forRoot(),
    SharedModule // Import SharedModule to use NavbarComponent and ExportService
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
