import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuditVersement } from 'src/app/models/audit-versement';
import { AuditVersementService } from 'src/app/services/audit-versement.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-versement',
  templateUrl: './audit-versement.component.html',
  styleUrls: ['./audit-versement.component.scss']
})
export class AuditVersementComponent implements OnInit, OnDestroy {
  _auditVersementSubscription!: Subscription;
  _row: AuditVersement[] = [];
  _rowFiltered!: AuditVersement[];
  _isSelect: boolean = false;
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _auditVersementService: AuditVersementService;
  dateFilter1: string = '';
  dateFilter2: string = '';
  _notificationService: NotificationMessageService;
  _operation: string = '';

  constructor(
    private auditVersementService: AuditVersementService,
    private notificationService: NotificationMessageService
  ) {
    this._auditVersementService = auditVersementService;
    this._notificationService = notificationService;
  }

  ngOnInit(): void {
    this._auditVersementService.getListAuditVersement();

    this._auditVersementSubscription = this._auditVersementService.auditVersementSubject.subscribe({
      next: (operations: AuditVersement[]) => {
        this.initTable(operations);
      },
      error: () =>
        this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
    });
  }

  ngOnDestroy(): void {
    if (this._auditVersementSubscription) this._auditVersementSubscription.unsubscribe();
  }

  initTable(operations: AuditVersement[]) {
    this._row = operations;
    this._rowFiltered = this._row;
  }

  onApplyFilterTypes() {
    if (this._operation === '') {
      this._rowFiltered = this._row;
    } else {
      this._rowFiltered = this._auditVersementService.getOperationFilterTypes(
        this._row,
        this._operation
      );
    }
  }

  onSetDateFilter() {
    if (this.dateFilter1 === '' && this.dateFilter2 === '') {
      this._auditVersementService.getListAuditVersement();
    } else {
      if (this.dateFilter1 !== '' && this.dateFilter2 === '') this.dateFilter2 = this.dateFilter1;
      else if (this.dateFilter1 === '' && this.dateFilter2 !== '')
        this.dateFilter1 = this.dateFilter2;
      this._auditVersementService.getListAuditVersement(this.dateFilter1, this.dateFilter2);
    }
    this.onApplyFilterTypes();
  }
  onClearDateFilter() {
    this.dateFilter1 = '';
    this.dateFilter2 = '';
    // this._auditVersementService.getListAuditVersement();
    this.onSetDateFilter();
  }
}
