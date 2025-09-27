import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'tr[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
  standalone: true,
  imports: [AngularSvgIconModule, CommonModule, RouterLink, FormsModule],
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Task>{};
  @Output() statusChange = new EventEmitter<Task>();

  constructor() {}

  ngOnInit(): void {}

  onStatusChange() {
    this.statusChange.emit(this.auction);
  }
}
