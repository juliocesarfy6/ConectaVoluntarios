import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home'; // Importamos tu componente home.ts

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Ruta por defecto (Homepage)
  { path: '**', redirectTo: '' }          // Cualquier ruta desconocida va al Home
];