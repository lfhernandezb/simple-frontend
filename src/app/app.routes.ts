import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home',  component: HomeComponent, data: { animation: 'home' } },
  { path: 'login', loadComponent: () => import('./login/login.component').then(c => c.LoginComponent), data: { animation: 'login' } },
];
