import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // <--- 1. Importar esto

@Component({
  selector: 'app-navbar',
  standalone: true, // <--- Asegúrate de tener esto true para usar imports
  imports: [CommonModule], // <--- 2. Agregar aquí para usar *ngIf en el HTML
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}