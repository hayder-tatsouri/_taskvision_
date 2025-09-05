import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHeaderComponent } from '../../components/project/project-header/project-header.component';
import { ProjectChartCardComponent } from '../../components/project/project-chart-card/project-chart-card.component';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Project } from 'src/app/modules/dashboard/models/projects';

@Component({
  selector: 'app-projects-table',
  imports: [ CommonModule, ProjectHeaderComponent ,ProjectChartCardComponent],  
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})

export class ProjectsTableComponent {
  projects: Project[] = [];
   tasks = [
    { title: 'UI Design', status: 'En cours' },
    { title: 'Base de données', status: 'En attente' },
    { title: 'Tests unitaires', status: 'En cours' }
  ];

   nbProjectsEnCours = 0;
  nbTasksEnCours = 0;

  constructor(private projectService : ProjectServiceService) {};

  

  ngOnInit() {
    this.getProjects();
    this.nbTasksEnCours = this.tasks.filter(t => t.status === 'En cours').length;

  }
  getProjects(): void {
       this.projectService.getProjects().subscribe(
         (data: Project[]) => {
           this.projects = data;
           console.log('Projets récupérés :', this.projects);
           this.nbProjectsEnCours = this.projects.filter(p => p.status === 'En cours').length;

         },
         (error) => {
           console.error('Erreur lors de la récupération des projets :', error);
         }
       );
     }

}
