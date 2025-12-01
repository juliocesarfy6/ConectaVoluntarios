import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login'; // <--- Importante: Importar el Login

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },      // <--- Nueva ruta añadida
  { path: '**', redirectTo: '' }
];