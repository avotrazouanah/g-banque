import { Subject, Subscription } from 'rxjs';

import { AuditOperation } from '../models/audit-operation';
import { Client } from '../models/client';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationMessageService } from './notification-message.service';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditOperationService {
  private operationList: AuditOperation[] = [];
  operationSubject = new Subject<AuditOperation[]>();
  operationSubcription!: Subscription;
  _notificationService: NotificationMessageService;
  private _httpClient: HttpClient;

  constructor(
    private httpClient: HttpClient,
    private notificationService: NotificationMessageService
  ) {
    this._httpClient = httpClient;
    this._notificationService = notificationService;
  }

  getListOperation(date1: string = '', date2: string = '') {
    this.operationSubcription = this.httpClient
      .post<any[]>(environment.api + '/audit_operation', { first_date: date1, second_date: date2 })
      .subscribe({
        next: (row) => {
          this.operationList = [];
          row.forEach((item) => {
            this.operationList.push(
              new AuditOperation(
                item.ops,
                item.date.split('T')[0],
                item.numCheck,
                item.montant,
                new Client(item.numCompte, item.nomClient),
                new User(item.username, item.name, '', item.type)
              )
            );
          });
          this.emitOperationSubject();
        },
        error: () =>
          this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
      });
  }

  emitOperationSubject() {
    this.operationSubject.next(this.operationList.slice());
  }

  getOperationFilterTypes(_operations: AuditOperation[], ops: string): AuditOperation[] {
    return _operations?.filter((item) => item.ops === ops);
  }
}
