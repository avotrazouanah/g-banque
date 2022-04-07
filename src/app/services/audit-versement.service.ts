import { Subject, Subscription } from 'rxjs';

import { AuditVersement } from '../models/audit-versement';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationMessageService } from './notification-message.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditVersementService {
  private auditVersementList: AuditVersement[] = [];
  auditVersementSubject = new Subject<AuditVersement[]>();
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

  getListAuditVersement(date1: string = '', date2: string = '') {
    this.auditVersementSubcription = this.httpClient
      .post<any[]>(environment.api + '/audit_versement', { first_date: date1, second_date: date2 })
      .subscribe({
        next: (row) => {
          this.auditVersementList = [];
          // console.log(row);
          row.forEach((item) => {
            this.auditVersementList.push(
              new AuditVersement(
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
          this.emitAuditVersementSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  emitAuditVersementSubject() {
    this.auditVersementSubject.next(this.auditVersementList.slice());
  }

  getOperationFilterTypes(_operations: AuditVersement[], ops: string): AuditVersement[] {
    return _operations?.filter((item) => item.ops === ops);
  }
}
