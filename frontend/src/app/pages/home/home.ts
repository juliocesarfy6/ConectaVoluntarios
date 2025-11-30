import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService, Evento } from '../../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gray-50 min-h-screen font-sans">
      <!-- Header Simple -->
      <div class="bg-white shadow-sm py-4 px-6 mb-8">
        <h1 class="text-xl font-bold text-gray-800">ConectaVoluntarios</h1>
      </div>

      <div class="container mx-auto px-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-6">Eventos Disponibles (Desde MySQL)</h2>

        <!-- ESTADO CARGANDO -->
        <div *ngIf="loading()" class="py-10 text-center text-teal-600 font-bold animate-pulse">
          Cargando datos...
        </div>

        <!-- LISTA DE EVENTOS -->
        <div *ngIf="!loading()" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let event of events()" class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
            <span class="text-xs font-bold text-teal-600 uppercase bg-teal-50 px-2 py-1 rounded">{{ event.category }}</span>
            <h3 class="mt-3 text-lg font-bold text-gray-900">{{ event.title }}</h3>
            <p class="mt-2 text-gray-500 text-sm h-12 overflow-hidden">{{ event.description }}</p>
            <div class="mt-4 pt-4 border-t border-gray-100 flex justify-between text-sm text-gray-500">
              <span>📅 {{ event.event_date }}</span>
              <span>👤 {{ event.organizer.full_name || 'Anónimo' }}</span>
            </div>
          </div>
        </div>
        
        <!-- ESTADO VACÍO -->
        <div *ngIf="!loading() && events().length === 0" class="text-center py-10 text-gray-500">
          No se encontraron eventos.
        </div>
      </div>
    </div>
  `
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  
  // Signals para manejar los datos
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