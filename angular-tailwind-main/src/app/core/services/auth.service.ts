import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/'; 

  constructor(private http : HttpClient,private router :Router) { }
login(email: string, password: string) {
    return this.http.post(this.apiUrl+'auth/login', { email, password });
  }
refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) return EMPTY;

  return this.http.post<any>(this.apiUrl + 'auth/refresh-token', { token: refreshToken })
    .pipe(
      tap(res => {
        localStorage.setItem('token', res.accessToken); // update access token
      })
    );
}
  logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  this.router.navigate(['/auth/sign-in']);
}
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  
}
