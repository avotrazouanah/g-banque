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
  _clientSubscription!: Subscription;
  _row: Client[] = [];
  _rowFiltered!: Client[];
  _isSelect: boolean = false;
  _clientSelect: Client[] = [];
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _clientDialog!: MatDialog;
  _clientService: ClientService;

  constructor(private clientDialog: MatDialog, private clientService: ClientService) {
    this._clientDialog = clientDialog;
    this._clientService = clientService;
    this._clientService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    this._clientService.getListUser();
    this._clientSubscription = this._clientService._clientSubject.subscribe({
      next: (clients: Client[]) => {
        this.initTable(clients);
      }
    });
    this._clientSubscription = this._clientService._currentSelectSubject.subscribe({
      next: (clientSelected) => {
        this._isSelect = clientSelected.status;
        this._clientSelect = clientSelected.clients;
      }
    });
    this._clientService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this._clientSubscription) this._clientSubscription.unsubscribe();
  }

  initTable(clients: Client[]) {
    this._row = clients;
    this._rowFiltered = this._row;
  }

  onCUD(action: string) {
    let width = '350px';
    if (action === 'add') this.onUnSelectRow();
    let _client: Client = this._clientSelect.length != 0 ? this._clientSelect[0] : new Client();
    this.clientDialog.open(ClientFormComponent, {
      width: width,
      data: { _action: action, _client: { ..._client } }
    });
  }

  checkRowValue(row: Client, search: string) {
    return (
      row.numCompte.toUpperCase().indexOf(search) >= 0 ||
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
    if (this._clientSelect.length > 0)
      this._clientService.setCurrentSelect(true, this._clientSelect);
  }

  onUnSelectRow() {
    this._clientService.setCurrentSelect(false, []);
  }
}
