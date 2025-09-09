import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';
import { Project } from '../../models/projects';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-projects',
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  project?: Project;
  loading = true;
  errorMessage = '';

  constructor(private projectService: ProjectServiceService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    // On écoute les changements de paramètre dans l'URL
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const projectId = Number(params.get('id'));
          this.loading = true;
          return this.projectService.getProject(projectId);
        })
      )
      .subscribe({
        next: (data) => {
          this.project = data;
          this.loading = false;
        },
        error: (err) => {
          this.errorMessage = 'Erreur lors de la récupération du projet';
          this.loading = false;
        }
      });
  }
}
