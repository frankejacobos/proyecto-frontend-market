import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User, UserRequest, UserResponse } from '../components/User';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  login(user: UserRequest) {
    return this.http.post<UserResponse>(
      environment.API_URL + '/users/login',
      user
    );
  }
  borrarUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
  guardarUser(user: User) {
    localStorage.setItem('token', user.token);
    localStorage.setItem('email', user.email);
  }
  existeToken(): boolean {
    return !!localStorage.getItem('token');
  }
  getUser(): User {
    return {
      token: localStorage.getItem('token') as string,
      email: localStorage.getItem('email') as string,
    };
  }
  actualizar = new EventEmitter<boolean>();
}
