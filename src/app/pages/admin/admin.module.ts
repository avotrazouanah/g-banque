import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuditCompteComponent } from './pages/audit-compte/audit-compte.component';
import { AuditOperationComponent } from './pages/audit-operation/audit-operation.component';
import { AuditRetraitComponent } from './pages/audit-retrait/audit-retrait.component';
import { AuditVersementComponent } from './pages/audit-versement/audit-versement.component';
import { ClientChooserComponent } from './common/client-chooser/client-chooser.component';
import { ClientComponent } from './pages/client/client.component';
import { ClientFormComponent } from './pages/client/client-form/client-form.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { NgModule } from '@angular/core';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { RetraitComponent } from './pages/retrait/retrait.component';
import { RetraitFormComponent } from './pages/retrait/retrait-form/retrait-form.component';
import { SidebarComponent } from 'src/app/pages/admin/common/sidebar/sidebar.component';
import { UserComponent } from './pages/user/user.component';
import { UserFormComponent } from './pages/user/user-form/user-form.component';
import { VersementComponent } from './pages/versement/versement.component';
import { VersementFormComponent } from './pages/versement/versement-form/versement-form.component';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    ClientComponent,
    VersementComponent,
    RetraitComponent,
    AuditOperationComponent,
    AuditVersementComponent,
    AuditRetraitComponent,
    AuditCompteComponent,
    UserComponent,
    ClientFormComponent,
    VersementFormComponent,
    ClientChooserComponent,
    RetraitFormComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule
  ]
})
export class AdminModule {}
