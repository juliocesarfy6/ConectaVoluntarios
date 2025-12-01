import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService, Evento } from '../../services/event.service';
import { Navbar } from '../../shared/navbar/navbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID); // <--- Inyectamos el identificador de la plataforma
  
  events = signal<Evento[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    // CORRECCIÓN: Verificamos si estamos en el navegador antes de usar window
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    
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