import { Component, OnInit, inject, signal, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService, Evento } from '../../services/event.service';
import { Navbar } from '../../shared/navbar/navbar';
import { Header } from "../../shared/header/header";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Navbar, Header],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID);
  
  events = signal<Evento[]>([]);
  loading = signal<boolean>(true);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    
    
  }
}