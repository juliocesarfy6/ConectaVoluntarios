import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que define los datos de MySQL
export interface Evento {
  id: number;
  title: string;
  description: string;
  category: string;
  event_date: string;
  event_time: string;
  location: string;
  max_volunteers: number;
  organizer: {
    full_name: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/api/events'; 

  getEvents(): Observable<Evento[]> {
    return this.http.get<Evento[]>(this.apiUrl);
  }
}