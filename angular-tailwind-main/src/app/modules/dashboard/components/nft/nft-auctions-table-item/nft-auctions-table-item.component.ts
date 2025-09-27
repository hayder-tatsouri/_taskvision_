import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TaskServicesService } from 'src/app/core/services/task-services.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'tr[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, RouterLink, FormsModule, NgClass],
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Task>{};
  @Output() statusChange = new EventEmitter<Task>();

  constructor(private taskService: TaskServicesService) {}

  ngOnInit(): void {}

  onStatusChange() {
  this.taskService.updateTaskStatus(this.auction.id, this.auction.status).subscribe({
    next: (updatedTask) => {
      this.statusChange.emit(updatedTask); // notify parent
    },
    error: (err) => {
      console.error('❌ Failed to update task status:', err);
    },
  });
}

  }

