import { Subject, Subscription } from 'rxjs';

import { AuditCompte } from '../models/audit-compte';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationMessageService } from './notification-message.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditCompteService {
  private auditCompteList: AuditCompte[] = [];
  auditVersementSubject = new Subject<AuditCompte[]>();
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

  getListAuditCompte(date1: string = '', date2: string = '') {
    this.auditVersementSubcription = this.httpClient
      .post<any[]>(environment.api + '/audit-retrait', { firstDate: date1, secondDate: date2 })
      .subscribe({
        next: (row) => {
          this.auditCompteList = [];
          row.forEach((item) => {
            this.auditCompteList.push(
              new AuditCompte(
                item.ops,
                item.date,
                item.anc_montant,
                item.n_montant,
                new Client(item.numCompte, item.nomClient),
                new User(item.username, item.name, '', item.type)
              )
            );
          });
          this.emitAuditCompteSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  emitAuditCompteSubject() {
    this.auditVersementSubject.next(this.auditCompteList.slice());
  }

  getOperationFilterTypes(_operations: AuditCompte[], ops: string): AuditCompte[] {
    return _operations?.filter((item) => !(item.ops === ops));
  }
}
