import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from 'src/app/modules/dashboard/models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl='http://localhost:3000/comment'
  constructor(private http:HttpClient) { }
  getCommentsForTask(taskId:number){
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Comment[]>(`${this.apiUrl}/getComments/${taskId}`, { headers });
  }
  addComment(taskId:number, content: string) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const body = { content };
    return this.http.post<Comment>(`${this.apiUrl}/addComment/${taskId}`, body, { headers });
  }


}
