import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/modules/dashboard/models/projects';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.css']
})
export class AllProjectsComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectServiceService) {}

  ngOnInit(): void {
    this.getAllProjects();
  }

  getAllProjects(): void {
    this.projectService.getAllProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
        console.log('Projets récupérés :', this.projects);
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      }
    );
  }
}
