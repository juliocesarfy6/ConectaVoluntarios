import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login'; // <--- Importante: Importar el Login
import { Dashboard } from './pages/dashboard/dashboard';
import { EventsFeedComponent } from './pages/feed/feed';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },      // <--- Nueva ruta añadida
  { path: '**', redirectTo: '' },
  { path: 'dashboard', component: Dashboard },
  { path: 'feed', component: EventsFeedComponent } // <--- Nueva ruta /feed
];