import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute, ParamMap } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nft-header',
  templateUrl: './nft-header.component.html',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
})
export class NftHeaderComponent implements OnInit {
  projectId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.projectId = Number(params.get('id'));
    });
  }
}
