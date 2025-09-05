import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/modules/uikit/pages/table/model/user.model';
import { HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  private apiUrl = 'http://localhost:3000/user';

  constructor(private htttp: HttpClient) { }
  users : User[] = [];
  getUsers() {
    return this.htttp.get(this.apiUrl+'/users');
  }
  addUser(user: User) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.htttp.post(this.apiUrl+'/createAccount', user, { headers });
  

}}
