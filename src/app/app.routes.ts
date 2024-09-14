// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ListBragComponent } from './brag-doc/components/list-brag/list-brag.component';
import { CreateEditBragComponent } from './brag-doc/components/create-edit-brag/create-edit-brag.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { ProfileComponent } from './auth/components/profile/profile.component';
import { DashboardComponent } from './auth/components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'brags', component: ListBragComponent },
  { path: 'brag/create', component: CreateEditBragComponent },
  { path: 'brag/edit/:id', component: CreateEditBragComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
