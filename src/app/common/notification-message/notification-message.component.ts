import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';

import { Notification } from 'src/app/models/notification';
import { NotificationMessageService } from 'src/app/services/notification-message.service';

@Component({
  selector: 'app-notification-message',
  templateUrl: './notification-message.component.html',
  styleUrls: ['./notification-message.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [])
    ])
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotificationMessageComponent implements OnInit {
  notifications!: Notification[];

  // eslint-disable-next-line no-unused-vars
  constructor(public service: NotificationMessageService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.notifications = this.service.notifications;
    this.service.onChange$.subscribe(() => {
      this.notifications = this.service.notifications;
      this.cdr.detectChanges();
    });
  }
}
