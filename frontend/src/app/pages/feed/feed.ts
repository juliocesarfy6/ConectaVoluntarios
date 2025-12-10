import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService, Evento } from '../../services/event.service';


@Component({
  selector: 'app-events-feed',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './feed.html',
  styleUrls: ['./feed.css']
})
export class EventsFeedComponent implements OnInit {
  events: any[] = [];
  filteredEvents: any[] = [];

  searchTerm: string = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    this.eventService.getEvents().subscribe((res: any) => {
      this.events = res;
      this.filteredEvents = res;
    });
  }

  applyFilters() {
    this.filteredEvents = this.events.filter(ev =>
      ev.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      ev.organization.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openFilters() {
    // TODO: abrir modal de filtros
  }

  goToEvent(id: string) {
    // TODO: router to event-detail
  }

}