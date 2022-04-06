import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';
import { Component, OnDestroy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserFormComponent } from './user-form/user-form.component';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  _userSubscription!: Subscription;
  _row: User[] = [];
  _rowFiltered!: User[];
  _isSelect: boolean = false;
  _userSelect: User[] = [];
  _msg = { emptyMessage: 'Aucun elément!' };
  _columnMode = ColumnMode;
  _selectionType = SelectionType;
  _search: string = '';
  _clientDialog!: MatDialog;
  _userService: UserService;

  constructor(private userDialog: MatDialog, private userService: UserService) {
    this._clientDialog = userDialog;
    this._userService = userService;
    this._userService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    this._userService.getListUser();
    this._userSubscription = this._userService._userSubject.subscribe({
      next: (users: User[]) => {
        this.initTable(users);
      }
    });
    this._userSubscription = this._userService._currentSelectSubject.subscribe({
      next: (clientSelected) => {
        this._isSelect = clientSelected.status;
        this._userSelect = clientSelected.users;
      }
    });
    this._userService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this._userSubscription) this._userSubscription.unsubscribe();
  }

  initTable(users: User[]) {
    this._row = users;
    this._rowFiltered = this._row;
  }

  onCUD(action: string) {
    let width = '350px';
    if (action === 'add') this.onUnSelectRow();
    let _user: User = this._userSelect.length != 0 ? this._userSelect[0] : new User();
    this.userDialog.open(UserFormComponent, {
      width: width,
      data: { _action: action, _user: { ..._user } }
    });
  }

  checkRowValue(row: User, search: string) {
    return (
      row.name.toUpperCase().indexOf(search) >= 0 ||
      row.type.toUpperCase().indexOf(search) >= 0 ||
      row.username.toUpperCase().indexOf(search) >= 0
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
    if (this._userSelect.length > 0) this._userService.setCurrentSelect(true, this._userSelect);
  }

  onUnSelectRow() {
    this._userService.setCurrentSelect(false, []);
  }
}
