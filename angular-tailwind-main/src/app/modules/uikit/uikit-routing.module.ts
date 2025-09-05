import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UikitComponent } from './uikit.component';
import { TableComponent } from './pages/table/table.component';
import { AddMemberComponent } from './pages/addMember/add-member.component'; 
import { AllProjectsComponent } from './pages/all-projects/all-projects.component';

const routes: Routes = [
  {
    path: '',
    component: UikitComponent,
    children: [
      { path: '', redirectTo: 'components', pathMatch: 'full' },
      { path: 'users', component: TableComponent },
      { path: '**', redirectTo: 'errors/404' },
      {path : 'addMember',component : AddMemberComponent},
      {path : 'allProjects', component : AllProjectsComponent} 
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UikitRoutingModule {}
