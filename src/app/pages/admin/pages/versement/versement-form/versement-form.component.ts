/* eslint-disable no-unused-vars */
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Client } from 'src/app/models/client';
import { ClientChooserComponent } from '../../../common/client-chooser/client-chooser.component';
import { ClientService } from 'src/app/services/client.service';
import { Subscription } from 'rxjs';
import { Versement } from 'src/app/models/versement';
import { VersementService } from 'src/app/services/versement.service';

@Component({
  selector: 'app-versement-form',
  templateUrl: './versement-form.component.html',
  styleUrls: ['./versement-form.component.scss']
})
export class VersementFormComponent implements OnInit, OnDestroy {
  action!: string;
  title!: string;
  classIcon!: string;
  nameBtn!: string;
  colorBtn!: string;
  versement!: Versement;
  versementForm!: FormGroup;
  msg_error: string = '';
  tempSubscription!: Subscription;
  loading: boolean = false;
  _clients!: Client[];

  constructor(
    private versementDialogRef: MatDialogRef<VersementFormComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { _action: string; _versement: Versement },
    private formBuilder: FormBuilder,
    private versementService: VersementService,
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
    this.initDialog();
    this.initForm(this.versement);
  }

  ngOnDestroy(): void {
    if (this.tempSubscription) this.tempSubscription.unsubscribe;
  }

  initDialog() {
    this.action = this.data._action;
    this.versement = this.data._versement;
    this.colorBtn = 'primary';
    switch (this.action) {
      case 'add':
        this.title = 'Add';
        this.nameBtn = 'Add';
        this.classIcon = 'fa fa-versement-plus';
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

  initForm(versement: Versement) {
    this.versementForm = this.formBuilder.group({
      numCheck: [
        versement.numCheck,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      numCompte: [
        versement.client.numCompte,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      montant: [
        versement.client.numCompte,
        [Validators.required, Validators.pattern('^[0-9]*$'), Validators.min(1)]
      ],
      date: [versement.date, [Validators.required]]
    });
  }

  onSubmit() {
    this.msg_error = '';
    this.loading = true;
    if (this.action != 'delete') {
      this.versement = new Versement(
        this.versementForm.value['numCompte'],
        this.versementForm.value['nomCompte']
      );
    }
    switch (this.action) {
      case 'add':
        this.tempSubscription = this.versementService.add(this.versement).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'edit':
        this.tempSubscription = this.versementService.edit(this.versement).subscribe({
          next: (res) => this.handleResult(res),
          error: (error) => {
            this.handleError(error);
          }
        });
        break;
      case 'delete':
        this.tempSubscription = this.versementService
          .delete(this.versement.numVersement)
          .subscribe({
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
    this.versementDialogRef.close();
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
      this.versementService.getListVersement();
      this.versementDialogRef.close();
      this.versementService.setCurrentSelect(false, []);
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
