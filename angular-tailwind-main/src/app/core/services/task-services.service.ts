import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Task } from 'src/app/modules/dashboard/models/task';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskServicesService {
  private apiUrl = 'http://localhost:3000/task'; // change if your backend is on another port/path

  constructor(private http: HttpClient) {}
  
  getTasksByProject(projectId: number): Observable<Task[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}/tasks`, { headers });
  }

  addTask(task: Task): Observable<Task> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Task>(`${this.apiUrl}/addTask`, task, { headers });
  }

  // ✅ New method to update a task
  updateTaskStatus(taskId: number, status: string): Observable<Task> {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.put<Task>(`${this.apiUrl}/changeTaskStatus/${taskId}`, { status }, { headers });
}

}
