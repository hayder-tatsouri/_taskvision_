import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectHeaderComponent } from '../../components/project/project-header/project-header.component';
import { ProjectChartCardComponent } from '../../components/project/project-chart-card/project-chart-card.component';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Project } from 'src/app/modules/dashboard/models/projects';
import { Task } from '../../models/task';
import { TaskServicesService } from 'src/app/core/services/task-services.service';

@Component({
  selector: 'app-projects-table',
  imports: [CommonModule, ProjectHeaderComponent, ProjectChartCardComponent],
  templateUrl: './projects-table.component.html',
  styleUrl: './projects-table.component.css'
})
export class ProjectsTableComponent {
  projects: Project[] = [];
  tasks: Task[] = [];

  nbProjectsEnCours = 0;
  nbTasksEnCours = 0;

  constructor(
    private projectService: ProjectServiceService,
    private taskService: TaskServicesService
  ) {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects(): void {
    this.projectService.getProjects().subscribe(
      (data: Project[]) => {
        this.projects = data;
        console.log('Projets récupérés :', this.projects);
        this.nbProjectsEnCours = this.projects.filter(p => p.status === 'En cours').length;

        // Once projects are loaded, fetch tasks for each project
        this.getTasksForAllProjects();
      },
      (error) => {
        console.error('Erreur lors de la récupération des projets :', error);
      }
    );
  }

  getTasksForAllProjects(): void {
    let totalTasksEnCours = 0;

    this.projects.forEach((project) => {
      this.taskService.getTasksByProject(project.id).subscribe(
        (tasks: Task[]) => {
          const enCours = tasks.filter(t => t.status === 'En cours').length;
          totalTasksEnCours += enCours;
          this.nbTasksEnCours = totalTasksEnCours;
          console.log(`Tâches "En cours" pour le projet ${project.title}:`, enCours);
        },
        (error) => {
          console.error(`Erreur pour le projet ${project.id} :`, error);
        }
      );
    });
  }
}
