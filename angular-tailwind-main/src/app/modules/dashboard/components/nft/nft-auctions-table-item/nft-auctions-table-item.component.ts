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

  // retourne une string de classes Tailwind suivant le status (tolérant aux accents/minuscules)
  statusClass(status?: string): string {
    if (!status) { return ''; }
    const s = status
      .toString()
      .normalize('NFD') // retire accents
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (s.includes('term')) {
      return 'border-green-300';
    }
    if (s.includes('cours')) {
      return 'border-yellow-300';
    }
    if (s.includes('attente')) {
      return 'border-red-300';
    }
    return '';
  }

  // inline styles to force select colors (used because some browsers ignore bg-* on native select)
  statusStyle(status?: string): { [key: string]: string } {
    if (!status) { return {}; }
    const s = status
      .toString()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (s.includes('term')) {
      return {
        'background-color': '#dcfce7', // green-100
        'color': '#166534',           // green-800
        'border-color': '#86efac'
      };
    }
    if (s.includes('cours')) {
      return {
        'background-color': '#fffbeb', // yellow-50 / soft
        'color': '#92400e',            // yellow-800
        'border-color': '#fde68a'
      };
    }
    if (s.includes('attente')) {
      return {
        'background-color': '#fee2e2', // red-100
        'color': '#991b1b',            // red-800
        'border-color': '#fca5a5'
      };
    }
    return {};
  }
}

