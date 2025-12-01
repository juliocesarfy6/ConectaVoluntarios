import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/auth';
  
  // Signal para guardar el usuario actual en toda la app
  currentUser = signal<any>(null);

  // CONSTRUCTOR: Recupera la sesión al recargar la página
  constructor() {
    if (typeof localStorage !== 'undefined') {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        try {
          this.currentUser.set(JSON.parse(savedUser));
        } catch (e) {
          console.error('Error al recuperar sesión', e);
        }
      }
    }
  }

  login(credentials: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      // Si el login es exitoso, guardamos al usuario en el signal y en localStorage
      tap((response: any) => {
        this.currentUser.set(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem('user');
    // Recargar página para limpiar estados
    window.location.reload(); 
  }
}