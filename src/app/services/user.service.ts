import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { User, UserSelected } from '../models/user';

import { HttpClient } from '@angular/common/http';
import { NotificationMessageService } from './notification-message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {
  private _users: User[] = [];
  _userSubject = new Subject<User[]>();
  _userSubscription!: Subscription;
  _currentSelect: UserSelected = new UserSelected();
  _currentSelectSubject = new Subject<UserSelected>();
  _httpClient: HttpClient;
  _notificationService: NotificationMessageService;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationMessageService
  ) {
    this._httpClient = httpClient;
    this._notificationService = notificationService;
  }

  ngOnDestroy(): void {
    if (this._userSubscription) this._userSubscription.unsubscribe();
  }

  emitUserSubject() {
    this._userSubject.next(this._users.slice());
  }

  getListUser() {
    this._userSubscription = this._httpClient.get<User[]>(environment.api + '/user').subscribe({
      next: (users) => {
        this._users = [];
        users.forEach((user) => {
          this._users.push(
            new User(user.username, user.name, user.password, user.type, user.user_id)
          );
        });
        this.emitUserSubject();
      },
      error: () =>
        this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
    });
  }

  getListClientObs(): Observable<User[]> {
    return this._httpClient.get<User[]>(environment.api + '/user').pipe(
      map((users) => {
        let _users: User[] = [];
        users.forEach((user) => {
          _users = [
            ..._users,
            new User(user.username, user.name, user.password, user.type, user.user_id)
          ];
        });
        return _users;
      })
    );
  }

  getOne(id: number): Observable<User> {
    return this._httpClient
      .get<User>(environment.api + '/user/' + id)
      .pipe(map((user: User) => user || new User()));
  }

  add(user: User): Observable<any> {
    return this._httpClient.post<any>(environment.api + '/user', user);
  }

  edit(user: User): Observable<any> {
    return this._httpClient.put<any>(environment.api + '/user/' + user.username, user);
  }

  delete(username: string): Observable<any> {
    return this._httpClient.delete<any>(environment.api + '/user/' + username);
  }

  getOneArray(_users: User[], username: string): User {
    return _users?.filter((user) => user.username === username)[0];
  }

  emitCurrentSelectSubject() {
    this._currentSelectSubject.next(this._currentSelect);
  }

  setCurrentSelect(status: boolean, users: User[]) {
    this._currentSelect.status = status;
    this._currentSelect.users = users;
    this.emitCurrentSelectSubject();
  }
}
