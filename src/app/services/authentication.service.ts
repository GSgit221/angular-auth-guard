import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { IUser } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  login(data: IUser) {
    let testUser = { username: 'admin@admin.com', password: '12345'}
    if (data.email === testUser.username && data.password === testUser.password) {
      localStorage.setItem('user', JSON.stringify(data));
      return of({ success: true });
    } else {
      return of({ success: false });
    }
  }

  get user(): IUser {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      return user;
    } catch (err) {
      return null;
    }
  }
}
