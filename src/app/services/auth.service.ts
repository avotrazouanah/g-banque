import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuth!: boolean;
  private connectedUser: User = new User();
  authSubject = new Subject<boolean>();
  connectedUserSubject = new Subject<User>();
  tokenName: string = 'token';
  // eslint-disable-next-line no-undef
  _localStorage = localStorage;

  // eslint-disable-next-line no-unused-vars
  constructor(private httpClient: HttpClient) {
    const tokenStorage = this._localStorage.getItem(this.tokenName);
    if (tokenStorage) {
      this.isAuth = true;
      // this.setConnectedUser(jwt_decode(tokenStorage));
      // console.log(this.connectedUser);
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

  saveToken(token: string) {
    this.isAuth = true;
    this._localStorage.setItem(this.tokenName, token);
    this.emitAuthSubject();
    this.setConnectedUser(jwt_decode(token));
  }

  logOut() {
    this.isAuth = false;
    this._localStorage.removeItem(this.tokenName);
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
