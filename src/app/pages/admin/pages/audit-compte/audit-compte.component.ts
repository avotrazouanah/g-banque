import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuditCompte } from 'src/app/models/audit-compte';
import { AuditCompteService } from 'src/app/services/audit-compte.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-compte',
  templateUrl: './audit-compte.component.html',
  styleUrls: ['./audit-compte.component.scss']
})
export class AuditCompteComponent implements OnInit, OnDestroy {
  _auditCompteSubscription!: Subscription;
  _row: AuditCompte[] = [];
  _rowFiltered!: AuditCompte[];
  _isSelect: boolean = false;
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _auditCompteService: AuditCompteService;
  dateFilter1: string = '';
  dateFilter2: string = '';
  _notificationService: NotificationMessageService;
  _operation: string = '';

  constructor(
    private auditCompteService: AuditCompteService,
    private notificationService: NotificationMessageService
  ) {
    this._auditCompteService = auditCompteService;
    this._notificationService = notificationService;
  }

  ngOnInit(): void {
    this._auditCompteService.getListAuditCompte();

    this._auditCompteSubscription = this._auditCompteService.auditVersementSubject.subscribe({
      next: (operations: AuditCompte[]) => {
        this.initTable(operations);
      },
      error: () =>
        this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
    });
  }

  ngOnDestroy(): void {
    if (this._auditCompteSubscription) this._auditCompteSubscription.unsubscribe();
  }

  initTable(operations: AuditCompte[]) {
    this._row = operations;
    this._rowFiltered = this._row;
  }

  onApplyFilterTypes() {
    if (this._operation === '') {
      this._rowFiltered = this._row;
    } else {
      this._rowFiltered = this._auditCompteService.getOperationFilterTypes(
        this._row,
        this._operation
      );
    }
  }

  onSetDateFilter() {
    if (this.dateFilter1 === '' && this.dateFilter2 === '') {
      this._auditCompteService.getListAuditCompte();
    } else {
      if (this.dateFilter1 !== '' && this.dateFilter2 === '') this.dateFilter2 = this.dateFilter1;
      else if (this.dateFilter1 === '' && this.dateFilter2 !== '')
        this.dateFilter1 = this.dateFilter2;
      this._auditCompteService.getListAuditCompte(this.dateFilter1, this.dateFilter2);
    }
    this.onApplyFilterTypes();
  }
  onClearDateFilter() {
    this.dateFilter1 = '';
    this.dateFilter2 = '';
    this.onSetDateFilter();
  }
}
