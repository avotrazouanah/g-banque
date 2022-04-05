import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable';

import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  userSubscription!: Subscription;
  dataSource!: MatTableDataSource<any>;
  isSelected: boolean = false;
  selectedUser: User[] = [];
  messages = { emptyMessage: 'Aucun elément!' };
  ColumnMode = ColumnMode;
  SelectionType = SelectionType;
  searchKey: string = '';

  // constructor(private userService: UserService, private userDialog: MatDialog) {
  // eslint-disable-next-line no-unused-vars
  constructor(private userDialog: MatDialog) {
    // this.userService.setCurrentSelect(false, []);
  }

  ngOnInit(): void {
    // eslint-disable-next-line no-undef
    console.log('test');
    // this.userService.getListUser();
    // this.userSubscription = this.userService.userSubject.subscribe({
    //   next: (users: User[]) => {
    //     this.initTable(users);
    //   }
    // });
    // this.userSubscription = this.userService.currentSelectSubject.subscribe({
    //   next: (userSelected) => {
    //     this.isSelected = userSelected.status;
    //     this.selectedUser = userSelected.users;
    //   }
    // });
    // this.userService.emitCurrentSelectSubject();
  }

  ngOnDestroy(): void {
    if (this.userSubscription) this.userSubscription.unsubscribe();
  }

  initTable(users: User[]) {
    this.dataSource = new MatTableDataSource<User>(users);
  }

  onCUD(action: string) {
    // eslint-disable-next-line no-undef
    console.log(action);
    // let width = '800px';
    // if (action === 'add') this.onUnSelectRow();
    // if (action === 'delete') width = '350px';

    // let user: User = this.selectedUser.length != 0 ? this.selectedUser[0] : new User();
    // this.userDialog.open(UserFormComponent, {
    //   width: width,
    //   data: { action: action, user: { ...user } }
    // });
  }

  onApplyFilter() {
    this.dataSource.filter = this.searchKey?.trim();
  }

  onClearSearch() {
    this.searchKey = '';
    this.onApplyFilter();
  }

  onSelectRow(selected: any) {
    // eslint-disable-next-line no-undef
    console.log(selected);
    // if (this.selectedUser.length > 0) this.userService.setCurrentSelect(true, this.selectedUser);
  }

  onUnSelectRow() {
    // eslint-disable-next-line no-undef
    console.log('unselect row');
    // this.userService.setCurrentSelect(false, []);
  }
}
