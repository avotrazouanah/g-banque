import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Versement } from 'src/app/models/versement';
import { VersementFormComponent } from './versement-form/versement-form.component';
import { VersementService } from 'src/app/services/versement.service';

@Component({
  selector: 'app-versement',
  templateUrl: './versement.component.html',
  styleUrls: ['./versement.component.scss']
})
export class VersementComponent implements OnInit, OnDestroy {
  _versementSubscription!: Subscription;
  _row: Versement[] = [];
  _rowFiltered!: Versement[];
  _isSelect: boolean = false;
  _versementSelect: Versement[] = [];
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _versementDialog!: MatDialog;
  _versementService: VersementService;

  constructor(private versementDialog: MatDialog, private versementService: VersementService) {
    this._versementDialog = versementDialog;
    this._versementService = versementService;
    this._versementService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    this._versementService.getListVersement();
    this._versementSubscription = this._versementService._versementSubject.subscribe({
      next: (versements: Versement[]) => {
        this.initTable(versements);
      }
    });
    this._versementSubscription = this._versementService._currentSelectSubject.subscribe({
      next: (versementSelected) => {
        this._isSelect = versementSelected.status;
        this._versementSelect = versementSelected.versements;
      }
    });
    this._versementService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this._versementSubscription) this._versementSubscription.unsubscribe();
  }

  initTable(versements: Versement[]) {
    this._row = versements;
    this._rowFiltered = this._row;
  }

  onCUD(action: string) {
    let width = '350px';
    if (action === 'add') this.onUnSelectRow();
    let _versement: Versement =
      this._versementSelect.length != 0 ? this._versementSelect[0] : new Versement();
    this.versementDialog.open(VersementFormComponent, {
      width: width,
      data: { _action: action, _versement: { ..._versement } }
    });
  }

  checkRowValue(row: Versement, search: string) {
    return (
      row.numVersement.toUpperCase().indexOf(search) >= 0 ||
      row.numCheck.toUpperCase().indexOf(search) >= 0 ||
      row.dateStr.toUpperCase().indexOf(search) >= 0 ||
      row.client.numCompte.toString().toUpperCase().indexOf(search) >= 0 ||
      row.client.nomClient.toString().toUpperCase().indexOf(search) >= 0
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
    if (this._versementSelect.length > 0)
      this._versementService.setCurrentSelect(true, this._versementSelect);
  }

  onUnSelectRow() {
    this._versementService.setCurrentSelect(false, []);
  }
}
