import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




const adminroutes: Routes = [
  {
    path: 'product',
    // canActivate:[RoleRouteGuard],
    loadChildren: () => import("./product/product.module").then(x => x.ProductModule)
  },
  {
    path: 'master',
    // canActivate:[RoleRouteGuard],
    loadChildren: () => import("./master/master.module").then(x => x.MasterModule)
  },
  {
    path: 'users',
    // canActivate:[RoleRouteGuard],
    loadChildren: () => import("./user-detail/user-detail.module").then(x => x.UserDetailModule)
  },
  {
    path: 'orders',
    // canActivate:[RoleRouteGuard],
    loadChildren: () => import("./orders/orders.module").then(x => x.OrdersModule)
  },
]



@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(adminroutes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
