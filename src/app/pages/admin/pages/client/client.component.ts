import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { Client } from 'src/app/models/client';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientService } from 'src/app/services/client.service';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit, OnDestroy {
  _cltSubscription!: Subscription;
  _row: Client[] = [];
  _rowFiltered!: Client[];
  _isSelect: boolean = false;
  _cltSelect: Client[] = [];
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _cltDialog!: MatDialog;
  _cltService: ClientService;

  constructor(private clientDialog: MatDialog, private clientService: ClientService) {
    this._cltDialog = clientDialog;
    this._cltService = clientService;
    this._cltService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    this._cltService.getListUser();
    this._cltSubscription = this._cltService._cltSubject.subscribe({
      next: (clients: Client[]) => {
        this.initTable(clients);
      }
    });
    this._cltSubscription = this._cltService._currentSelectSubject.subscribe({
      next: (clientSelected) => {
        this._isSelect = clientSelected.status;
        this._cltSelect = clientSelected.clients;
      }
    });
    this._cltService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this._cltSubscription) this._cltSubscription.unsubscribe();
  }

  initTable(clients: Client[]) {
    this._row = clients;
    this._rowFiltered = this._row;
  }

  onCUD(action: string) {
    let width = '800px';
    if (action === 'add') this.onUnSelectRow();
    if (action === 'delete') width = '350px';
    let _clt: Client = this._cltSelect.length != 0 ? this._cltSelect[0] : new Client();
    this.clientDialog.open(ClientFormComponent, {
      width: width,
      data: { action: action, _clt: { ..._clt } }
    });
  }

  checkRowValue(row: Client, search: string) {
    return (
      row.numCompte.toString().toUpperCase().indexOf(search) >= 0 ||
      row.nomClient.toUpperCase().indexOf(search) >= 0
    );
  }

  onApplyFilter() {
    this._rowFiltered = this._row.filter((row) =>
      this.checkRowValue(row, this._search.toUpperCase())
    );
  }

  onClearSearch() {
    this._search = '';
    this.onApplyFilter();
  }

  onSelectRow() {
    if (this._cltSelect.length > 0) this._cltService.setCurrentSelect(true, this._cltSelect);
  }

  onUnSelectRow() {
    this._cltService.setCurrentSelect(false, []);
  }
}
