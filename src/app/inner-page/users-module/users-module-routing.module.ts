import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const userroutes: Routes = [
      {
        path: 'product',
        // canActivate:[RoleRouteGuard],
        loadChildren: () => import("./products/products.module").then(x => x.ProductsModule)
      },
      {
        path: 'team',
        // canActivate:[RoleRouteGuard],
        loadChildren: () => import("./my-team/my-team.module").then(x => x.MyTeamModule)
      },
      {
        path: 'profile',
        // canActivate:[RoleRouteGuard],
        loadChildren: () => import("./my-profile/my-profile.module").then(x => x.MyProfileModule)
      },
]

@NgModule({
  imports: [RouterModule.forChild(userroutes)],
  exports: [RouterModule]
})
export class UsersModuleRoutingModule { }
