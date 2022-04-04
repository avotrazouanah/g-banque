import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationMessageComponent } from './notification-message.component';

@NgModule({
  declarations: [NotificationMessageComponent],
  imports: [CommonModule],
  exports: [NotificationMessageComponent]
})
export class NotificationMessageModule {}
