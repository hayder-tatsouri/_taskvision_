import { Component } from '@angular/core';
import { Task } from 'src/app/modules/dashboard/models/task';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  projectId!: number;
  constructor(private taskService:TaskServicesService , private route: ActivatedRoute) {}
  ngOnInit() {
    // Récupérer projectId depuis l’URL
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }
  addTask(form: NgForm) {
  console.log("Formulaire complet :", form);
  console.log("Valeurs :", form.value);

  if (form.valid) {
    const task: Task = {
      ...form.value,
      projectId: this.projectId
    };
    this.taskService.addTask(task).subscribe({
      next: (newTask) => {
        console.log('✅ Tâche ajoutée avec succès :', newTask);
        form.resetForm({ status: 'En attente' });
      },
      error: (err) => {
        console.error('❌ Erreur lors de l’ajout de la tâche', err);
      }
    });
  }
}

}


