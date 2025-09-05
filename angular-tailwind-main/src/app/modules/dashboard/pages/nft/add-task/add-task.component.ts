import { Component } from '@angular/core';
import { Task } from 'src/app/modules/dashboard/models/task';
import { NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  task: Partial<Task> = {
    title: '',
   
    description: '',
    startDate: '',
    endDate: '',
    status: 'En attente',
    projectId: 0
  };

  constructor() {}

  addTask(form: NgForm) {
    if (form.valid) {
      // For now, just log the task to console
      console.log('Nouvelle tâche ajoutée :', this.task);

      // Reset form after adding task
      form.resetForm({
        status: 'En attente'  // default value for status after reset
      });
    }
  }
}


