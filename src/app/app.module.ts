import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NotificationMessageModule } from './common/notification-message/notification-message.module';
import { SidebarComponent } from './common/sidebar/sidebar.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent],
  imports: [BrowserModule, AppRoutingModule, NotificationMessageModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
