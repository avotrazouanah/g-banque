/* eslint-disable no-unused-vars */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {
  action!: string;
  title!: string;
  classIcon!: string;
  nameBtn!: string;
  colorBtn!: string;
  user!: User;
  userForm!: FormGroup;
  msg_error: string = '';
  tempSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private userDialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _action: string; _user: User },
    private formBuilder: FormBuilder,
    private userService: UserService,
    private notificationService: NotificationMessageService
  ) {}

  ngOnInit(): void {
    this.initDialog();
    this.initForm(this.user);
  }

  ngOnDestroy(): void {
    if (this.tempSubscription) this.tempSubscription.unsubscribe;
  }

  initDialog() {
    this.action = this.data._action;
    this.user = this.data._user;
    this.colorBtn = 'primary';
    switch (this.action) {
      case 'add':
        this.title = 'Add';
        this.nameBtn = 'Add';
        this.classIcon = 'fa fa-user-plus';
        break;
      case 'edit':
        this.title = 'Edit';
        this.nameBtn = 'Edit';
        this.classIcon = 'fa fa-edit';
        break;
      case 'delete':
        this.title = 'Delete';
        this.nameBtn = 'Delete';
        this.colorBtn = 'warn';
        this.classIcon = 'fa fa-trash';
        break;
      default:
        this.title = '';
    }
  }

  initForm(user: User) {
    this.userForm = this.formBuilder.group({
      username: [user.username, [Validators.required]],
      name: [user.name, Validators.required],
      password: [user.password, Validators.required],
      type: [user.type, Validators.required]
    });
  }

  onSubmit() {
    this.msg_error = '';
    this.loading = true;
    if (this.action != 'delete') {
      this.user = new User(
        this.userForm.value['username'],
        this.userForm.value['name'],
        this.userForm.value['password'],
        this.userForm.value['type'],
        ''
      );
    }
    switch (this.action) {
      case 'add':
        this.tempSubscription = this.userService.add(this.user).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'edit':
        this.tempSubscription = this.userService.edit(this.user).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'delete':
        this.tempSubscription = this.userService.delete(this.user.username).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      default:
        this.msg_error = 'No action';
    }
  }

  onClose() {
    this.userDialogRef.close();
  }

  handleResult(res: any) {
    this.loading = false;
    if (res.success) {
      this.userService.getListUser();
      this.userDialogRef.close();
      this.userService.setCurrentSelect(false, []);
    }
  }

  handleError(error: any) {
    this.loading = false;
    if (error.status == 409) {
      this.msg_error = error.error.message;
    } else {
      this.msg_error = 'Connexion Error';
    }
    this.notificationService.alert({ _content: this.msg_error, _style: 'color: red' });
  }
}
