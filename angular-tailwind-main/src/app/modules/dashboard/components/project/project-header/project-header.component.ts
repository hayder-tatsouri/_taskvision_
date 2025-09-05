import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-header',
  imports: [CommonModule,RouterLink],
  templateUrl: './project-header.component.html',
  styleUrl: './project-header.component.css'
})
export class ProjectHeaderComponent {
  onAddProject() {
  console.log("Ajouter Projet cliqué");}

}
