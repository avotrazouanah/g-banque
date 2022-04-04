import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ClientComponent } from './pages/client/client.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'client', component: ClientComponent },
      // { path: 'product', component: ProductComponent },
      // { path: 'category', component: CategoryComponent },
      // { path: 'sale', component: SaleComponent },
      // { path: 'stock-sheet', component: StockSheetComponent },
      // { path: 'paid-cart', component: PaidCartComponent },
      { path: '', redirectTo: 'client', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
