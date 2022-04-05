/* eslint-disable no-unused-vars */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, OnDestroy {
  action!: string;
  title!: string;
  classIcon!: string;
  nameBtn!: string;
  colorBtn!: string;
  client!: Client;
  clientForm!: FormGroup;
  msg_error: string = '';
  tempSubscription!: Subscription;
  loading: boolean = false;

  // _clientRef: MatDialogRef<ClientFormComponent>;
  // _data: { _action: string; _client: Client };
  // _formBuilder: FormBuilder;
  // _clientService: ClientService;
  // _notificationService: NotificationMessageService;

  constructor(
    private userDialogRef: MatDialogRef<ClientFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _action: string; _client: Client },
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private notificationService: NotificationMessageService
  ) {
    // this._clientRef = userDialogRef;
    // this._data = data;
    // this._formBuilder = formBuilder;
    // this._clientService = clientService;
    // this._notificationService = notificationService;
  }

  ngOnInit(): void {
    this.initDialog();
    this.initForm(this.client);
  }

  ngOnDestroy(): void {
    if (this.tempSubscription) this.tempSubscription.unsubscribe;
  }

  initDialog() {
    this.action = this.data._action;
    this.client = this.data._client;
    this.colorBtn = 'primary';
    switch (this.action) {
      case 'add':
        this.title = 'Add';
        this.nameBtn = 'Add';
        this.classIcon = 'fa fa-client-plus';
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

  initForm(client: Client) {
    this.clientForm = this.formBuilder.group({
      numCompte: [
        client.numCompte,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      nomClient: [client.nomClient, Validators.required]
    });
  }

  onSubmit() {
    this.msg_error = '';
    this.loading = true;
    if (this.action != 'delete') {
      this.client = new Client(
        this.clientForm.value['numCompte'],
        this.clientForm.value['nomCompte']
      );
    }
    switch (this.action) {
      case 'add':
        this.tempSubscription = this.clientService.add(this.client).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'edit':
        this.tempSubscription = this.clientService.edit(this.client).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'delete':
        this.tempSubscription = this.clientService.delete(this.client.numCompte).subscribe({
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
      this.clientService.getListUser();
      this.userDialogRef.close();
      this.clientService.setCurrentSelect(false, []);
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
