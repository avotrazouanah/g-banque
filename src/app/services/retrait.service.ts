import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, map } from 'rxjs';
import { Retrait, RetraitSelected } from '../models/retrait';

import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { NotificationMessageService } from './notification-message.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetraitService implements OnDestroy {
  private _retrait: Retrait[] = [];
  _retraitSubject = new Subject<Retrait[]>();
  _retraitSubscription!: Subscription;
  _currentSelect: RetraitSelected = new RetraitSelected();
  _currentSelectSubject = new Subject<RetraitSelected>();
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
    if (this._retraitSubscription) this._retraitSubscription.unsubscribe();
  }

  emitRetraitSubject() {
    this._retraitSubject.next(this._retrait.slice());
  }

  getListRetrait() {
    this._retraitSubscription = this._httpClient
      .get<Retrait[]>(environment.api + '/retrait')
      .subscribe({
        next: (row: any) => {
          this._retrait = [];
          row.forEach((item: any) => {
            this._retrait.push(
              new Retrait(
                item.numRetrait,
                item.numCheck,
                item.montant,
                item.date,
                new Client(item.numCompte, item.nomClient)
              )
            );
          });
          this.emitRetraitSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  getListRetraitObs(): Observable<Retrait[]> {
    return this._httpClient.get<Retrait[]>(environment.api + '/retrait').pipe(
      map((row: any) => {
        let _retrait: Retrait[] = [];
        row.forEach((item: any) => {
          _retrait = [
            ..._retrait,
            new Retrait(
              item.numRetrait,
              item.numCheck,
              item.montant,
              item.date,
              new Client(item.numCompte, item.nomClient)
            )
          ];
        });
        return _retrait;
      })
    );
  }

  getOne(id: number): Observable<Retrait> {
    return this._httpClient
      .get<Retrait>(environment.api + '/retrait/' + id)
      .pipe(map((retrait: Retrait) => retrait || new Retrait()));
  }

  add(retrait: Retrait): Observable<any> {
    return this._httpClient.post<any>(environment.api + '/retrait', retrait);
  }

  edit(retrait: Retrait): Observable<any> {
    return this._httpClient.put<any>(environment.api + '/retrait/' + retrait.numRetrait, retrait);
  }

  delete(id: string): Observable<any> {
    return this._httpClient.delete<any>(environment.api + '/retrait/' + id);
  }

  getOneArray(_retrait: Retrait[], numRetrait: string): Retrait {
    return _retrait?.filter((retrait) => retrait.numRetrait === numRetrait)[0];
  }

  emitCurrentSelectSubject() {
    this._currentSelectSubject.next(this._currentSelect);
  }

  setCurrentSelect(status: boolean, retraits: Retrait[]) {
    this._currentSelect.status = status;
    this._currentSelect.retraits = retraits;
    this.emitCurrentSelectSubject();
  }
}
