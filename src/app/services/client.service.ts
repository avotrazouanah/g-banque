import { Client, ClientSelected } from '../models/client';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { NotificationMessageService } from './notification-message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnDestroy {
  private _clients: Client[] = [];
  _clientSubject = new Subject<Client[]>();
  _clientSubscription!: Subscription;
  _currentSelect: ClientSelected = new ClientSelected();
  _currentSelectSubject = new Subject<ClientSelected>();
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
    if (this._clientSubscription) this._clientSubscription.unsubscribe();
  }

  emitClientSubject() {
    this._clientSubject.next(this._clients.slice());
  }

  getListClient() {
    this._clientSubscription = this._httpClient
      .get<Client[]>(environment.api + '/client')
      .subscribe({
        next: (users) => {
          this._clients = [];
          users.forEach((client) => {
            this._clients.push(new Client(client.numCompte, client.nomClient, client.solde));
          });
          this.emitClientSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  getListClientObs(): Observable<Client[]> {
    return this._httpClient.get<Client[]>(environment.api + '/client').pipe(
      map((users) => {
        let _clients: Client[] = [];
        users.forEach((client) => {
          _clients = [..._clients, new Client(client.numCompte, client.nomClient, client.solde)];
        });
        return _clients;
      })
    );
  }

  getOne(id: number): Observable<Client> {
    return this._httpClient
      .get<Client>(environment.api + '/client/' + id)
      .pipe(map((client: Client) => client || new Client()));
  }

  add(client: Client): Observable<any> {
    return this._httpClient.post<any>(environment.api + '/client', {
      numCompte: client.numCompte,
      nomClient: client.nomClient
    });
  }

  edit(client: Client): Observable<any> {
    return this._httpClient.put<any>(environment.api + '/client/' + client.numCompte, {
      numCompte: client.numCompte,
      nomClient: client.nomClient
    });
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.api + '/client/' + id);
  }

  getOneArray(_clients: Client[], numCompte: string): Client {
    return _clients?.filter((client) => client.numCompte === numCompte)[0];
  }

  emitCurrentSelectSubject() {
    this._currentSelectSubject.next(this._currentSelect);
  }

  setCurrentSelect(status: boolean, clients: Client[]) {
    this._currentSelect.status = status;
    this._currentSelect.clients = clients;
    this.emitCurrentSelectSubject();
  }
}
