import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 font-sans">
      <div class="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg border border-gray-100">
        <div class="text-center">
          <h2 class="mt-6 text-3xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p class="mt-2 text-sm text-gray-600">Ingresa tus credenciales</p>
        </div>
        
        <form class="mt-8 space-y-6" (ngSubmit)="onLogin()">
          <div class="rounded-md shadow-sm -space-y-px">
            <div class="mb-4">
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <!-- Usamos ngModel para capturar lo que escribe el usuario -->
              <input [(ngModel)]="email" name="email" type="email" required 
                class="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input [(ngModel)]="password" name="password" type="password" required 
                class="appearance-none rounded-lg block w-full px-3 py-2 border border-gray-300 placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm">
            </div>
          </div>

          <!-- Mensaje de Error -->
          <div *ngIf="errorMessage" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {{ errorMessage }}
          </div>

          <div>
            <button type="submit" 
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
              Ingresar
            </button>
          </div>

          <!-- Botón Demo Rápido -->
          <div class="mt-4">
             <button type="button" (click)="fillDemoData()" class="w-full text-xs text-gray-500 underline">
               (Llenar con datos de prueba: Julio Lugo)
             </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  email = '';
  password = '';
  errorMessage = '';

  onLogin() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        // Si el login es correcto, ir al Dashboard (o Home por ahora)
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errorMessage = err.error.msg || 'Error al iniciar sesión';
      }
    });
  }

  fillDemoData() {
    this.email = 'julio@mail.com';
    this.password = 'cualquiercosa';
  }
}