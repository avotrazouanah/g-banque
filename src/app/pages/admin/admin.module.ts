import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientComponent } from './pages/client/client.component';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { SidebarComponent } from 'src/app/pages/admin/common/sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, ClientComponent],
  imports: [CommonModule, AdminRoutingModule, MatSidenavModule]
})
export class AdminModule {}
