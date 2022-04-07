import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { AuditOperation } from 'src/app/models/audit-operation';
import { AuditOperationService } from 'src/app/services/audit-operation.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-audit-operation',
  templateUrl: './audit-operation.component.html',
  styleUrls: ['./audit-operation.component.scss']
})
export class AuditOperationComponent implements OnInit, OnDestroy {
  _operationSubscription!: Subscription;
  _row: AuditOperation[] = [];
  _rowFiltered!: AuditOperation[];
  _isSelect: boolean = false;
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _auditOperationService: AuditOperationService;
  dateFilter1: string = '';
  dateFilter2: string = '';
  _notificationService: NotificationMessageService;
  _operation: string = '';

  constructor(
    private auditOperationService: AuditOperationService,
    private notificationService: NotificationMessageService
  ) {
    this._auditOperationService = auditOperationService;
    this._notificationService = notificationService;
  }

  ngOnInit(): void {
    this._auditOperationService.getListOperation();

    this._operationSubscription = this._auditOperationService.operationSubject.subscribe({
      next: (operations: AuditOperation[]) => {
        this.initTable(operations);
      },
      error: () =>
        this._notificationService.alert({ _content: 'Connexion Error', _style: 'color: red' })
    });
  }

  ngOnDestroy(): void {
    if (this._operationSubscription) this._operationSubscription.unsubscribe();
  }

  initTable(operations: AuditOperation[]) {
    this._row = operations;
    this._rowFiltered = this._row;
  }

  onApplyFilterTypes() {
    if (this._operation === '') {
      this._rowFiltered = this._row;
    } else {
      this._rowFiltered = this._auditOperationService.getOperationFilterTypes(
        this._row,
        this._operation
      );
    }
  }

  onSetDateFilter() {
    if (this.dateFilter1 === '' && this.dateFilter2 === '') {
      this._auditOperationService.getListOperation();
    } else {
      if (this.dateFilter1 !== '' && this.dateFilter2 === '') this.dateFilter2 = this.dateFilter1;
      else if (this.dateFilter1 === '' && this.dateFilter2 !== '')
        this.dateFilter1 = this.dateFilter2;
      this._auditOperationService.getListOperation(this.dateFilter1, this.dateFilter2);
    }
    this.onApplyFilterTypes();
  }

  onClearDateFilter() {
    this.dateFilter1 = '';
    this.dateFilter2 = '';
    this.onSetDateFilter();
  }
}
