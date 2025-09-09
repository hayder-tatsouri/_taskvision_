import { Injectable } from '@angular/core';
import { Project } from 'src/app/modules/dashboard/models/projects';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {
  private apiUrl = 'http://localhost:3000/user'; // change if your backend is on another port/path

  constructor(private http: HttpClient) {}
  
  getProjects() {
     const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Project[]>(`${this.apiUrl}/getUserProjects`, { headers });
  }
  getAllProjects() {
     const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Project[]>(`http://localhost:3000/project/projects`, { headers });
  }
  createProject(project :Project){
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`http://localhost:3000/project/createProject`,project, { headers });
  }
  getProject(id:number) {
     const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Project>(`http://localhost:3000/project/${id}`, { headers });
  }

  

}
