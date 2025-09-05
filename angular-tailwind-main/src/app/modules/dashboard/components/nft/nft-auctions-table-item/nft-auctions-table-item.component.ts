import { Component, Input, OnInit } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { Task } from '../../../models/task';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'tr[nft-auctions-table-item]',
  templateUrl: './nft-auctions-table-item.component.html',
  imports: [AngularSvgIconModule,  CommonModule, RouterLink],
})
export class NftAuctionsTableItemComponent implements OnInit {
  @Input() auction = <Task>{};

  constructor() {}

  ngOnInit(): void {}
}
