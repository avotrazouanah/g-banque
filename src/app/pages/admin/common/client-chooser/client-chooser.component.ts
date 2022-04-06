import { AfterContentChecked, Component, OnDestroy, OnInit } from '@angular/core';
/* eslint-disable no-unused-vars */
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-chooser',
  templateUrl: './client-chooser.component.html',
  styleUrls: ['./client-chooser.component.scss']
})
export class ClientChooserComponent implements OnInit, OnDestroy, AfterContentChecked {
  clientSubscription!: Subscription;
  row: Client[] = [];
  rowFiltered!: Client[];
  isSelected: boolean = false;
  clientSelect: Client[] = [];
  messages = { emptyMessage: 'Aucun elément!' };
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  searchKey: string = '';

  constructor(
    private clientService: ClientService,
    private clientDialogRef: MatDialogRef<ClientChooserComponent>
  ) {}

  ngOnInit(): void {
    this.clientService.getListClient();
    this.clientSubscription = this.clientService._clientSubject.subscribe({
      next: (clients: Client[]) => {
        this.initTable(clients);
      }
    });
    this.clientSubscription = this.clientService._currentSelectSubject.subscribe({
      next: (clientSelected) => {
        this.isSelected = clientSelected.status;
        this.clientSelect = clientSelected.clients;
      }
    });
    this.clientService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this.clientSubscription) this.clientSubscription.unsubscribe();
  }

  // ngAfterViewChecked() {
  //   window.dispatchEvent(new Event('resize'));
  // }
  ngAfterContentChecked(): void {
    // eslint-disable-next-line no-undef
    window.dispatchEvent(new Event('resize'));
  }

  initTable(clients: Client[]) {
    this.row = clients;
    this.rowFiltered = this.row;
  }

  checkRowValue(row: Client, search: string) {
    return (
      row.numCompte.toUpperCase().indexOf(search) >= 0 ||
      row.nomClient.toUpperCase().indexOf(search) >= 0
    );
  }

  onApplyFilter() {
    this.rowFiltered = this.row.filter((row) =>
      this.checkRowValue(row, this.searchKey.toUpperCase())
    );
  }

  onClearSearch() {
    this.searchKey = '';
    this.onApplyFilter();
  }

  onSelectRow(selected: any) {
    if (this.clientSelect.length > 0) this.clientService.setCurrentSelect(true, this.clientSelect);
  }

  onUnSelectRow() {
    this.clientService.setCurrentSelect(false, []);
  }

  onClose() {
    this.clientDialogRef.close();
  }
}
