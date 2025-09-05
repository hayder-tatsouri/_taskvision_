import { HttpClient } from '@angular/common/http';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { toast } from 'ngx-sonner';
import { dummyData } from 'src/app/shared/dummy/user.dummy';
import { TableActionComponent } from './components/table-action/table-action.component';
import { TableFooterComponent } from './components/table-footer/table-footer.component';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { TableRowComponent } from './components/table-row/table-row.component';
import { User } from './model/user.model';
import { TableFilterService } from './services/table-filter.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [
    AngularSvgIconModule,
    FormsModule,
    TableHeaderComponent,
    TableFooterComponent,
    TableRowComponent,
    TableActionComponent,
    RouterLink
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent implements OnInit {
  users = signal<User[]>([]);

  constructor(private http: HttpClient, private filterService: TableFilterService) {
    const token = localStorage.getItem('token');
    
    this.http.get<User[]>('http://localhost:3000/user/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).subscribe({
      next: (data) => this.users.set(data),
      error: (error) => {
        this.users.set(dummyData);
        this.handleRequestError(error);
        console.error('Error fetching users:', error);
      },
    });
  }

  public toggleUsers(checked: boolean) {
    this.users.update((users) => {
      return users.map((user) => {
        return { ...user, selected: checked };
      });
    });
  }

  private handleRequestError(error: any) {
    const msg = 'An error occurred while fetching users. Loading dummy data as fallback.';
    toast.error(msg, {
      position: 'bottom-right',
      description: error.message,
      action: {
        label: 'Undo',
        onClick: () => console.log('Action!'),
      },
      actionButtonStyle: 'background-color:#DC2626; color:white;',
    });
  }

  filteredUsers = computed(() => {
    const search = this.filterService.searchField().toLowerCase();
    const status = this.filterService.statusField();
    const order = this.filterService.orderField();

    return this.users()
      .filter(
        (user) =>
          user.firstName.toLowerCase().includes(search) ||
          user.lastName.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search) ||
          user.role.toLowerCase().includes(search)
      )
      .filter((user) => {
        if (!status) return true;
        switch (status) {
          case '1':
            return user.status === 1;
          case '2':
            return user.status === 2;
          case '3':
            return user.status === 3;
          default:
            return true;
        }
      })
      .sort((a, b) => {
        const defaultNewest = !order || order === '1';
        if (defaultNewest) {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (order === '2') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        return 0;
      });
  });

  ngOnInit() {}
}
