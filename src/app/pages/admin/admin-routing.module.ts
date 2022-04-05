import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuditCompteComponent } from './pages/audit-compte/audit-compte.component';
import { AuditOperationComponent } from './pages/audit-operation/audit-operation.component';
import { AuditRetraitComponent } from './pages/audit-retrait/audit-retrait.component';
import { AuditVersementComponent } from './pages/audit-versement/audit-versement.component';
import { ClientComponent } from './pages/client/client.component';
import { NgModule } from '@angular/core';
import { RetraitComponent } from './pages/retrait/retrait.component';
import { UserComponent } from './pages/user/user.component';
import { VersementComponent } from './pages/versement/versement.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'client', component: ClientComponent },
      { path: 'versement', component: VersementComponent },
      { path: 'retrait', component: RetraitComponent },
      { path: 'audit-operation', component: AuditOperationComponent },
      { path: 'audit-versement', component: AuditVersementComponent },
      { path: 'audit-retrait', component: AuditRetraitComponent },
      { path: 'audit-compte', component: AuditCompteComponent },
      { path: 'user', component: UserComponent },
      { path: '', redirectTo: 'client', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
