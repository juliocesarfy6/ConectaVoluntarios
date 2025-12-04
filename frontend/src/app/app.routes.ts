import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { LoginComponent } from './pages/auth/login'; 
import { EventsFeedComponent } from './pages/feed/feed';
import { Dashboard } from './pages/dashboard/dashboard';
export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },      
  { path: 'dashboard', component: Dashboard },
  { path: 'feed', component: EventsFeedComponent },
  { path: '**', redirectTo: '' }
];