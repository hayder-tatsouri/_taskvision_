import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Task } from 'src/app/modules/dashboard/models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {
  private apiUrl = 'http://localhost:3000/task'; // change if your backend is on another port/path

  constructor(private http: HttpClient) {}
  
  getTasksByProject(projectId: number) {
     const token = localStorage.getItem('token');
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}/tasks`, { headers });
  }
  
}