import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { Task } from 'src/app/modules/dashboard/models/task';
import { NftAuctionsTableItemComponent } from '../nft-auctions-table-item/nft-auctions-table-item.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-nft-auctions-table, [nft-auctions-table]',
  templateUrl: './nft-auctions-table.component.html',
  imports: [CommonModule, NftAuctionsTableItemComponent],
  standalone: true,
})
export class NftAuctionsTableComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskServicesService, private route: ActivatedRoute ) {}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params) => {
        const projectId = Number(params.get('id')); // get project id from URL
        if (projectId) {
          this.loadTasks(projectId);
        }
      });  
    }

  loadTasks(projectId: number) {
    this.tasks=[];
      this.taskService.getTasksByProject(projectId).subscribe((data) => {
      this.tasks = data;
    });
  }
}
