import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NftComponent } from './pages/nft/nft.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ProjectsTableComponent } from './pages/projects-table/projects-table.component';
import { CommentComponent } from './pages/comment/comment.component';   
import { AddTaskComponent } from './pages/nft/add-task/add-task.component'; 
import { CreateProjectComponent } from './components/project/create-project/create-project.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'nfts', pathMatch: 'full' },
      { path: 'nfts', component: NftComponent },
      { path: 'taskProject/:id', component: NftComponent },
      { path: '**', redirectTo: 'errors/404' },
      {path: 'project/:id', component: ProjectsComponent},
      {path : 'projects', component: ProjectsTableComponent},
      { path: 'comments/:id', component: CommentComponent },
      {path: 'add-task', component: AddTaskComponent},
      {path : 'create-project', component : CreateProjectComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
