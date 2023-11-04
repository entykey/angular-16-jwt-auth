import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = 'http://localhost:5116/api/Admin/';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // getPublicContent(): Observable<any> {
  //   return this.http.get(API_URL + 'all', { responseType: 'text' });
  // }

  getUserBoard(): Observable<any> {
    const sessionData = sessionStorage.getItem('auth-user');
    const authUser = sessionData ? JSON.parse(sessionData) : null;
    const accessToken = authUser ? authUser.accessToken : null;

    if (accessToken) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        })
      };

      return this.http.get(API_URL + 'users', httpOptions);
    } else {
      return this.http.get(API_URL + 'users', { responseType: 'json' });
    }
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
}
