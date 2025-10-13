import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { User } from '../../model/user.model';
import { UserServicesService } from 'src/app/core/services/user-services.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: '[app-table-row]',
  imports: [FormsModule, AngularSvgIconModule],
  templateUrl: './table-row.component.html',
  styleUrl: './table-row.component.css',
})
export class TableRowComponent {
  @Input() user!: User;
  @Output() userDeleted = new EventEmitter<number>(); // 🔹 Notifie le parent

  constructor(private userService: UserServicesService) {}

  deleteUser(userId: number) {
    if (!confirm(`Voulez-vous vraiment supprimer ${this.user.firstName} ${this.user.lastName} ?`)) {
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        toast.success('✅ Utilisateur supprimé avec succès');
        this.userDeleted.emit(userId); // 🔹 Émet l’ID supprimé vers le parent
      },
      error: (err) => {
        console.error('❌ Erreur de suppression:', err);
        toast.error('Erreur lors de la suppression');
      },
    });
  }
}
