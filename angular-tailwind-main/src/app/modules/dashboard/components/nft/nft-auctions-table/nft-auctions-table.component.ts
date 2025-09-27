import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { Task } from 'src/app/modules/dashboard/models/task';
import { NftAuctionsTableItemComponent } from '../nft-auctions-table-item/nft-auctions-table-item.component';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-nft-auctions-table, [nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
  imports: [CommonModule, NftAuctionsTableItemComponent, FormsModule],
  standalone: true,
})
export class NftAuctionsTableComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskServicesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const projectId = Number(params.get('id'));
      if (projectId) {
        this.loadTasks(projectId);
      }
    });
  }

  loadTasks(projectId: number) {
    this.tasks = [];
    this.taskService.getTasksByProject(projectId).subscribe((data) => {
      this.tasks = data;
    });
  }

   updateTaskStatus(task: Task) {
    this.taskService.updateTaskStatus(task.id, task.status).subscribe({
      next: (updatedTask) => {
        console.log(`✅ Task ${updatedTask.id} updated to ${updatedTask.status}`);
        // mets à jour localement la liste des tasks pour refléter le changement
        const index = this.tasks.findIndex(t => t.id === updatedTask.id);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
        }
      },
      error: (err) => console.error('❌ Failed to update task status:', err),
    });
  }
}

