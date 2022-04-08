/* eslint-disable no-unused-vars */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/models/client';
import { ClientService } from 'src/app/services/client.service';
import { Retrait } from 'src/app/models/retrait';
import { ClientChooserComponent } from '../../../common/client-chooser/client-chooser.component';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { RetraitService } from 'src/app/services/retrait.service';

@Component({
  selector: 'app-retrait-form',
  templateUrl: './retrait-form.component.html',
  styleUrls: ['./retrait-form.component.scss']
})
export class RetraitFormComponent implements OnInit, OnDestroy {
  action!: string;
  title!: string;
  classIcon!: string;
  nameBtn!: string;
  colorBtn!: string;
  retrait!: Retrait;
  retraitForm!: FormGroup;
  msg_error: string = '';
  tempSubscription!: Subscription;
  loading: boolean = false;
  _clients!: Client[];
  client_id_selected: string = '';

  constructor(
    private retraitDialogRef: MatDialogRef<RetraitFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _action: string; _retrait: Retrait },
    private formBuilder: FormBuilder,
    private retraitService: RetraitService,
    private notificationService: NotificationMessageService,
    private clientService: ClientService,
    private clientChooserDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.tempSubscription = this.clientService.getListClientObs().subscribe({
      next: (row) => {
        this._clients = row;
      },
      error: (error) => {
        this.handleError(error);
      }
    });

    this.tempSubscription = this.clientService._currentSelectSubject.subscribe({
      next: (p) => {
        this.client_id_selected = p.clients[0]?.numCompte || this.data._retrait.client.numCompte;
      }
    });
    this.clientService.emitCurrentSelectSubject();
    this.initDialog();
    this.initForm(this.retrait);
  }

  ngOnDestroy(): void {
    if (this.tempSubscription) this.tempSubscription.unsubscribe;
  }

  initDialog() {
    this.action = this.data._action;
    this.retrait = this.data._retrait;
    this.colorBtn = 'primary';
    switch (this.action) {
      case 'add':
        this.title = 'Add';
        this.nameBtn = 'Add';
        this.classIcon = 'fa fa-plus';
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

  initForm(retrait: Retrait) {
    this.retraitForm = this.formBuilder.group({
      numCheck: [
        retrait.numCheck,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      numCompte: [
        this.client_id_selected,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      montant: [
        retrait.montant,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      date: [retrait.date, [Validators.required]]
    });
  }

  onSubmit() {
    this.msg_error = '';
    this.loading = true;
    if (this.action != 'delete') {
      this.retrait = new Retrait(
        this.retrait.numRetrait,
        this.retraitForm.value['numCheck'],
        this.retraitForm.value['montant'],
        this.retraitForm.value['date'],
        new Client(this.retraitForm.value['numCompte'])
      );
    }
    switch (this.action) {
      case 'add':
        this.tempSubscription = this.retraitService.add(this.retrait).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'edit':
        this.tempSubscription = this.retraitService.edit(this.retrait).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'delete':
        this.tempSubscription = this.retraitService.delete(this.retrait.numRetrait).subscribe({
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
    this.retraitDialogRef.close();
  }

  onOpenProductTable(event: any) {
    event.stopPropagation();
    this.clientChooserDialog.open(ClientChooserComponent, {
      width: '800px',
      data: 'dialog'
    });
  }

  handleResult(res: any) {
    this.loading = false;
    if (res.success) {
      this.retraitService.getListRetrait();
      this.retraitDialogRef.close();
      this.retraitService.setCurrentSelect(false, []);
    }
  }

  handleError(error: any) {
    this.loading = false;
    // console.log(error);
    if (error.status == 409) {
      this.msg_error = error.error.message;
    } else {
      this.msg_error = 'Connexion Error';
    }
    this.notificationService.alert({ _content: this.msg_error, _style: 'color: red' });
  }
}
