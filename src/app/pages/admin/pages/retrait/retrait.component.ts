import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Retrait } from 'src/app/models/retrait';
import { RetraitFormComponent } from './retrait-form/retrait-form.component';
import { RetraitService } from 'src/app/services/retrait.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit, OnDestroy {
  _retraitSubscription!: Subscription;
  _row: Retrait[] = [];
  _rowFiltered!: Retrait[];
  _isSelect: boolean = false;
  _retraitSelect: Retrait[] = [];
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _retraitDialog!: MatDialog;
  _retraitService: RetraitService;

  constructor(private retraitDialog: MatDialog, private retraitService: RetraitService) {
    this._retraitDialog = retraitDialog;
    this._retraitService = retraitService;
    this._retraitService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    this._retraitService.getListRetrait();
    this._retraitSubscription = this._retraitService._retraitSubject.subscribe({
      next: (retraits: Retrait[]) => {
        this.initTable(retraits);
      }
    });
    this._retraitSubscription = this._retraitService._currentSelectSubject.subscribe({
      next: (retraitSelected) => {
        this._isSelect = retraitSelected.status;
        this._retraitSelect = retraitSelected.retraits;
      }
    });
    this._retraitService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this._retraitSubscription) this._retraitSubscription.unsubscribe();
  }

  initTable(retraits: Retrait[]) {
    this._row = retraits;
    this._rowFiltered = this._row;
  }

  onCUD(action: string) {
    let width = '350px';
    if (action === 'add') this.onUnSelectRow();
    let _retrait: Retrait =
      this._retraitSelect.length != 0 ? this._retraitSelect[0] : new Retrait();
    this.retraitDialog.open(RetraitFormComponent, {
      width: width,
      data: { _action: action, _retrait: { ..._retrait } }
    });
  }

  checkRowValue(row: Retrait, search: string) {
    return (
      row.numRetrait.toString().toUpperCase().indexOf(search) >= 0 ||
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
    if (this._retraitSelect.length > 0)
      this._retraitService.setCurrentSelect(true, this._retraitSelect);
  }

  onUnSelectRow() {
    this._retraitService.setCurrentSelect(false, []);
  }
}
