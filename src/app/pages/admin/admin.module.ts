import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { SidebarComponent } from 'src/app/common/sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent],
  imports: [CommonModule, AdminRoutingModule, MatSidenavModule]
})
export class AdminModule {}
