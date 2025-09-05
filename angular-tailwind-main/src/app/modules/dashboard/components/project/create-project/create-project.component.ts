import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectServiceService } from 'src/app/core/services/project-service.service';

@Component({
  selector: 'app-create-project',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {
  constructor(private projectService:ProjectServiceService ){}
   onSubmit(formValue: any) {
    this.projectService.createProject(formValue).subscribe({
      next: (res) => {
        console.log('Project created successfully:', res);
        alert('Projet ajouté avec succès ✅');
      },
      error: (err) => {
        console.error('Error creating project:', err);
        alert('❌ Erreur lors de la création du projet');
      },
    });
   }

}
