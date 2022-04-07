import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth!: boolean;
  private connectedUser: User = new User();
  authSubject = new Subject<boolean>();
  connectedUserSubject = new Subject<User>();
  userStorageName: string = 'user';
  // eslint-disable-next-line no-undef
  _localStorage = localStorage;

  // eslint-disable-next-line no-unused-vars
  constructor(private httpClient: HttpClient) {
    const userStorage = this._localStorage.getItem(this.userStorageName);
    if (userStorage) {
      this.isAuth = true;
      this.setConnectedUser(JSON.parse(userStorage));
    }
  }

  emitAuthSubject() {
    this.authSubject.next(this.isAuth);
  }

  emitConnectedUserSubject() {
    this.connectedUserSubject.next(this.connectedUser);
  }

  setConnectedUser(user: User) {
    this.connectedUser = user;
    this.emitConnectedUserSubject();
  }

  saveUserStorage(user_str: string) {
    this.isAuth = true;
    this._localStorage.setItem(this.userStorageName, user_str);
    this.emitAuthSubject();
    this.setConnectedUser(JSON.parse(user_str));
  }

  logOut() {
    this.isAuth = false;
    this._localStorage.removeItem(this.userStorageName);
    this.emitAuthSubject();
    this.setConnectedUser(new User());
  }

  logInServer(username: string, password: string) {
    return this.httpClient.post<any>(environment.api + '/login', {
      username: username,
      password: password
    });
  }
}
