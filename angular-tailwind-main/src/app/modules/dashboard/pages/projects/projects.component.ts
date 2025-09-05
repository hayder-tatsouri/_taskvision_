import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  project = {
  title: 'Création d’un site web vitrine',
  description: 'Conception et développement d’un site web vitrine pour présenter les services d’une entreprise, incluant une page d’accueil, une galerie, et un formulaire de contact.',
  startDate: '2025-03-01',
  endDate: '2025-05-15',
  status: 'En cours',          
  clientName: 'WebSolutions',   
  projectManager: 'Alice Martin',
};


}
