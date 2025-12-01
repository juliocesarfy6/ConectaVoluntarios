import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // IMPORTANTE: Para navegar
import { EventService, Evento } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink], // Agregamos RouterLink
  template: `
    <div class="bg-gray-50 min-h-screen font-sans">
      
      <!-- HEADER DINÁMICO -->
      <nav class="bg-white shadow-sm py-4 px-6 mb-8 flex justify-between items-center sticky top-0 z-10">
        <h1 class="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span class="text-teal-600 text-2xl">♥</span> ConectaVoluntarios
        </h1>

        <div class="flex gap-4 items-center">
          <!-- Si NO hay usuario logueado -->
          <ng-container *ngIf="!authService.currentUser()">
            <a routerLink="/login" class="text-gray-600 font-medium hover:text-teal-600 transition-colors">
              Iniciar Sesión
            </a>
            <button class="bg-teal-600 text-white px-4 py-2 rounded-md font-medium hover:bg-teal-700 shadow-sm transition-colors">
              Registrarse
            </button>
          </ng-container>

          <!-- Si SÍ hay usuario logueado (Julio Lugo) -->
          <ng-container *ngIf="authService.currentUser() as user">
            <div class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-bold text-gray-900">{{ user.full_name }}</p>
                <p class="text-xs text-gray-500 capitalize">{{ user.role }}</p>
              </div>
              <div class="w-10 h-10 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center font-bold">
                {{ user.full_name.charAt(0) }}
              </div>
              <button (click)="authService.logout()" class="text-sm text-red-500 hover:text-red-700 font-medium ml-2">
                Salir
              </button>
            </div>
          </ng-container>
        </div>
      </nav>

      <!-- CONTENIDO PRINCIPAL (Lista de Eventos) -->
      <div class="container mx-auto px-6">
        <div class="flex justify-between items-end mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Eventos Disponibles</h2>
            <!-- Filtros simples (visuales por ahora) -->
            <div class="hidden md:flex gap-2">
                <span class="px-3 py-1 bg-teal-600 text-white text-xs rounded-full font-bold">Todos</span>
                <span class="px-3 py-1 bg-white text-gray-600 border border-gray-200 text-xs rounded-full hover:bg-gray-50 cursor-pointer">Medio Ambiente</span>
                <span class="px-3 py-1 bg-white text-gray-600 border border-gray-200 text-xs rounded-full hover:bg-gray-50 cursor-pointer">Educación</span>
            </div>
        </div>

        <div *ngIf="loading()" class="py-10 text-center text-teal-600 font-bold animate-pulse">
          Cargando datos...
        </div>

        <div *ngIf="!loading()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          <div *ngFor="let event of events()" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <!-- Header de la tarjeta con color según categoría -->
            <div class="h-3 bg-teal-500"></div> 
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-4">
                 <span class="text-xs font-bold text-teal-700 uppercase bg-teal-50 px-2 py-1 rounded-md border border-teal-100">
                    {{ event.category }}
                 </span>
                 <span class="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full">
                    {{ event.max_volunteers }} cupos
                 </span>
              </div>
              
              <h3 class="text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">{{ event.title }}</h3>
              <p class="mt-2 text-gray-500 text-sm line-clamp-2 leading-relaxed">{{ event.description }}</p>
              
              <div class="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2 text-sm text-gray-600">
                <div class="flex items-center gap-2">
                    <span>📅</span> <span>{{ event.event_date }} • {{ event.event_time }}</span>
                </div>
                <div class="flex items-center gap-2">
                    <span>📍</span> <span class="truncate">{{ event.location }}</span>
                </div>
                <div class="flex items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>🏢</span> <span>{{ event.organizer.full_name }}</span>
                </div>
              </div>

              <!-- Botón de acción (Solo si está logueado) -->
              <button *ngIf="authService.currentUser()" class="mt-4 w-full py-2 bg-gray-50 text-teal-700 font-bold rounded-lg hover:bg-teal-600 hover:text-white transition-all border border-gray-200 hover:border-teal-600">
                 Ver Detalles
              </button>
            </div>
          </div>
        </div>
        
        <div *ngIf="!loading() && events().length === 0" class="text-center py-10 text-gray-500">
          No se encontraron eventos.
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  public authService = inject(AuthService); // Public para usar en el HTML
  
  events = signal<Evento[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    this.eventService.getEvents().subscribe({
      next: (data) => {
        this.events.set(data);
        this.loading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.loading.set(false);
      }
    });
  }
}