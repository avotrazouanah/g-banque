import { Subject, Subscription } from 'rxjs';

import { AuditRetrait } from '../models/audit-retrait';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationMessageService } from './notification-message.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditRetraitService {
  private auditRetraitList: AuditRetrait[] = [];
  auditVersementSubject = new Subject<AuditRetrait[]>();
  auditVersementSubcription!: Subscription;
  _notificationService: NotificationMessageService;
  private _httpClient: HttpClient;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationMessageService
  ) {
    this._httpClient = httpClient;
    this._notificationService = notificationService;
  }

  getListAuditRetrait(date1: string = '', date2: string = '') {
    this.auditVersementSubcription = this.httpClient
      .post<any[]>(environment.api + '/audit_retrait', { first_date: date1, second_date: date2 })
      .subscribe({
        next: (row) => {
          this.auditRetraitList = [];
          // console.log(row);
          row.forEach((item) => {
            this.auditRetraitList.push(
              new AuditRetrait(
                item.ops,
                item.date.split('T')[0],
                item.numVersement,
                item.anc_montant,
                item.n_montant,
                new Client(item.numCompte, item.nomClient),
                new User(item.username, item.name, '', item.type)
              )
            );
          });
          this.emitAuditRetraitSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  emitAuditRetraitSubject() {
    this.auditVersementSubject.next(this.auditRetraitList.slice());
  }

  getOperationFilterTypes(_operations: AuditRetrait[], ops: string): AuditRetrait[] {
    return _operations?.filter((item) => item.ops === ops);
  }
}
