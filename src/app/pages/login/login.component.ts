/* eslint-disable no-unused-vars */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';
import { NotificationMessageService } from 'src/app/services/notification-message.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  msg_error: string = '';
  isAuth!: boolean;
  tempSubscription!: Subscription;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tempSubscription = this.authService.authSubject.subscribe({
      next: (isAuth) => (this.isAuth = isAuth)
    });
    this.authService.emitAuthSubject();
    this.initForm();
    // eslint-disable-next-line no-undef
    window.scroll(0, 0);
  }

  ngOnDestroy(): void {
    if (this.tempSubscription) this.tempSubscription.unsubscribe;
  }

  initForm() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.msg_error = '';
    this.loading = true;
    this.tempSubscription = this.authService
      .logInServer(this.loginForm.value['username'], this.loginForm.value['password'])
      .subscribe({
        next: (res) => this.handleResult(res),
        error: (error) => {
          this.handleError(error);
        }
      });
  }

  handleResult(res: any) {
    this.loading = false;
    if (res.success) {
      this.authService.saveUserStorage(JSON.stringify(res.user));
      this.router.navigate(['/admin/client']);
      this.notificationService.alert({ _content: 'Your are connected' });
    }
  }

  handleError(error: any) {
    this.loading = false;
    let er = error.error.error || error.error.message;
    if (er) {
      this.msg_error = er;
    } else {
      this.msg_error = 'Connexion Error';
    }
    this.notificationService.alert({ _content: this.msg_error, _style: 'color: red' });
  }
}
