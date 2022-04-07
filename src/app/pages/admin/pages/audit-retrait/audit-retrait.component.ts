import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuditRetrait } from 'src/app/models/audit-retrait';
import { AuditRetraitService } from 'src/app/services/audit-retrait.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-retrait',
  templateUrl: './audit-retrait.component.html',
  styleUrls: ['./audit-retrait.component.scss']
})
export class AuditRetraitComponent implements OnInit, OnDestroy {
  _auditRetraitSubscription!: Subscription;
  _row: AuditRetrait[] = [];
  _rowFiltered!: AuditRetrait[];
  _isSelect: boolean = false;
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _auditRetraitService: AuditRetraitService;
  dateFilter1: string = '';
  dateFilter2: string = '';
  _notificationService: NotificationMessageService;
  _operation: string = '';

  constructor(
    private auditRetraitService: AuditRetraitService,
    private notificationService: NotificationMessageService
  ) {
    this._auditRetraitService = auditRetraitService;
    this._notificationService = notificationService;
  }

  ngOnInit(): void {
    this._auditRetraitService.getListAuditRetrait();

    this._auditRetraitSubscription = this._auditRetraitService.auditVersementSubject.subscribe({
      next: (operations: AuditRetrait[]) => {
        this.initTable(operations);
      },
      error: () =>
        this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
    });
  }

  ngOnDestroy(): void {
    if (this._auditRetraitSubscription) this._auditRetraitSubscription.unsubscribe();
  }

  initTable(operations: AuditRetrait[]) {
    this._row = operations;
    this._rowFiltered = this._row;
  }

  onApplyFilterTypes() {
    if (this._operation === '') {
      this._rowFiltered = this._row;
    } else {
      this._rowFiltered = this._auditRetraitService.getOperationFilterTypes(
        this._row,
        this._operation
      );
    }
  }

  onSetDateFilter() {
    if (this.dateFilter1 === '' && this.dateFilter2 === '') {
      this._auditRetraitService.getListAuditRetrait();
    } else {
      if (this.dateFilter1 !== '' && this.dateFilter2 === '') this.dateFilter2 = this.dateFilter1;
      else if (this.dateFilter1 === '' && this.dateFilter2 !== '')
        this.dateFilter1 = this.dateFilter2;
      this._auditRetraitService.getListAuditRetrait(this.dateFilter1, this.dateFilter2);
    }
    this.onApplyFilterTypes();
  }
  onClearDateFilter() {
    this.dateFilter1 = '';
    this.dateFilter2 = '';
    this.onSetDateFilter();
  }
}
