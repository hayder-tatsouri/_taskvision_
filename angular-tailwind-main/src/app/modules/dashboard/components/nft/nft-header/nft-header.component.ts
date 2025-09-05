import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-nft-header',
    templateUrl: './nft-header.component.html',
    standalone: true,
    imports: [RouterLink,CommonModule,FormsModule],
})
export class NftHeaderComponent implements OnInit {
  onAddTask(formValue: any) {
  console.log("Ajouter Tâche cliqué", formValue);
  // ouvrir modal ou rediriger vers /tasks/add
}
  constructor() {}

  ngOnInit(): void {}
}
