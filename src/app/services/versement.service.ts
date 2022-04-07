import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { Versement, VersementSelected } from '../models/versement';

import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { NotificationMessageService } from './notification-message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VersementService implements OnDestroy {
  private _versement: Versement[] = [];
  _versementSubject = new Subject<Versement[]>();
  _versementSubscription!: Subscription;
  _currentSelect: VersementSelected = new VersementSelected();
  _currentSelectSubject = new Subject<VersementSelected>();
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
    if (this._versementSubscription) this._versementSubscription.unsubscribe();
  }

  emitVersementSubject() {
    this._versementSubject.next(this._versement.slice());
  }

  getListVersement() {
    this._versementSubscription = this._httpClient
      .get<Versement[]>(environment.api + '/versement')
      .subscribe({
        next: (row: any) => {
          this._versement = [];
          row.forEach((item: any) => {
            this._versement.push(
              new Versement(
                item.numVersement,
                item.numCheck,
                item.montant,
                item.date.split('T')[0],
                new Client(item.numCompte, item.nomClient)
              )
            );
          });
          this.emitVersementSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  getListVersementObs(): Observable<Versement[]> {
    return this._httpClient.get<Versement[]>(environment.api + '/versement').pipe(
      map((row: any) => {
        let _versement: Versement[] = [];
        row.forEach((item: any) => {
          _versement = [
            ..._versement,
            new Versement(
              item.numVersement,
              item.numCheck,
              item.montant,
              item.date.split('T')[0],
              new Client(item.numCompte, item.nomClient)
            )
          ];
        });
        return _versement;
      })
    );
  }

  getOne(id: number): Observable<Versement> {
    return this._httpClient
      .get<Versement>(environment.api + '/versement/' + id)
      .pipe(map((versement: Versement) => versement || new Versement()));
  }

  add(versement: Versement): Observable<any> {
    return this._httpClient.post<any>(environment.api + '/versement', {
      numCheck: versement.numCheck,
      numCompte: versement.client.numCompte,
      montant: versement.montant,
      date: versement.date
    });
  }

  edit(versement: Versement): Observable<any> {
    return this._httpClient.put<any>(environment.api + '/versement/' + versement.numVersement, {
      numVersement: versement.numVersement,
      numCheck: versement.numCheck,
      numCompte: versement.client.numCompte,
      montant: versement.montant,
      date: versement.date
    });
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.api + '/versement/' + id);
  }

  getOneArray(_versement: Versement[], numVersement: string): Versement {
    return _versement?.filter((versement) => versement.numVersement === numVersement)[0];
  }

  emitCurrentSelectSubject() {
    this._currentSelectSubject.next(this._currentSelect);
  }

  setCurrentSelect(status: boolean, versements: Versement[]) {
    this._currentSelect.status = status;
    this._currentSelect.versements = versements;
    this.emitCurrentSelectSubject();
  }
}
