import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router'; // Necesario para el Sidebar
import { EventService, Evento } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms'; // Para la barra de búsqueda

@Component({
  selector: 'app-events-feed',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule], // Quitamos NavbarComponent, agregamos RouterLink
  templateUrl: './feed.html',
})
export class EventsFeedComponent implements OnInit {
  private eventService = inject(EventService);
  public authService = inject(AuthService);
  
  events = signal<Evento[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>(''); // Para el buscador

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

  // Getter para filtrar eventos por texto
  get filteredEvents() {
    const term = this.searchTerm().toLowerCase();
    return this.events().filter(e => 
      e.title.toLowerCase().includes(term) || 
      e.description.toLowerCase().includes(term) ||
      e.organizer?.full_name.toLowerCase().includes(term)
    );
  }
}