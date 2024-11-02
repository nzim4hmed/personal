import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminGuard } from '../common/_helpers/Guards/admin.guard';
import { UserGuard } from '../common/_helpers/Guards/user.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '', loadComponent: () => import("./inner-page.component")
      .then(c => c.InnerPageComponent),
    children: [
      { path: "AdminDashboard", component: AdminDashboardComponent, canActivate: [AdminGuard] },
      { path: "UserDashboard", component: UserDashboardComponent, canActivate: [UserGuard] },
      { path: "Admin", loadChildren: () => import("./super-admin/super-admin.module").then(x => x.SuperAdminModule) },
      { path: "User", loadChildren: () => import("./users-module/users-module.module").then(x => x.UsersModuleModule) },
      // { path: "", redirectTo: "home", pathMatch: "full" },
      // {
      //     path: "home",
      //     loadComponent: () => import("./home/home.component")
      //         .then(c => c.HomeComponent), title: "Home"
      // },
      // {
      //     path: "about",
      //     loadComponent: () => import("./about/about.component")
      //         .then(c => c.AboutComponent), title: "Home"
      // },
      // { path: "contact", component:ContactComponent},
      // { path: "blogs", component:BlogComponent},
      // { path: "blog-single", component:BlogSingalComponent},
      // { path: "registration", component:RegistrationComponent},

      // { path: "shop", component:ShopComponent},
      // { path: "shop-single", component:ShopSingleComponent},
      // { path: "checkout", component:CheckOutComponent},
      // { path: "cart", component:CartComponent},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InnerPageRoutingModule { }
