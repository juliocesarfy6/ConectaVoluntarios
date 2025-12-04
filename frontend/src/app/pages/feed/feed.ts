import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Evento } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';
import { SidebarComponent } from '../../shared/sidebar/sidebar';

@Component({
  selector: 'app-events-feed',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent], 
  templateUrl: './feed.html',
})
export class EventsFeedComponent implements OnInit {
  private eventService = inject(EventService);
  public authService = inject(AuthService);
  
  events = signal<Evento[]>([]);
  loading = signal<boolean>(true);
  searchTerm = signal<string>('');

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

  get filteredEvents() {
    const term = this.searchTerm().toLowerCase();
    return this.events().filter(e => 
      e.title.toLowerCase().includes(term) || 
      e.organizer?.full_name.toLowerCase().includes(term)
    );
  }
}