import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      // { path: 'user', component: UserComponent },
      // { path: 'product', component: ProductComponent },
      // { path: 'category', component: CategoryComponent },
      // { path: 'sale', component: SaleComponent },
      // { path: 'stock-sheet', component: StockSheetComponent },
      // { path: 'paid-cart', component: PaidCartComponent },
      // { path: '', redirectTo: 'user', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
