import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientComponent } from './pages/client/client.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { SidebarComponent } from 'src/app/pages/admin/common/sidebar/sidebar.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent, ClientComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatSidenavModule,
    MatFormFieldModule,
    NgxDatatableModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule
  ]
})
export class AdminModule {}
