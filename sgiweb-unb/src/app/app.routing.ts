import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

// Created components
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', component: LoginComponent },
];

// Export routing in order to import it on app.module.ts
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
