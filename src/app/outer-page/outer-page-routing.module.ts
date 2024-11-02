import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact/contact.component';
import { BlogComponent } from './blog/blog.component';
import { BlogSingalComponent } from './blog-singal/blog-singal.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShopComponent } from './shop/shop.component';
import { ShopSingleComponent } from './shop-single/shop-single.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminLayoutComponent } from '../common/components/layout/outer-page-layout/admin-layout/admin-layout.component';


const outerPagesRoutes: Routes = [
  {
    path: '', loadComponent: () => import("./outer-page.component")
        .then(c => c.OuterPageComponent),
    children: [
        { path: "", redirectTo: "home", pathMatch: "full" },
        {
            path: "home",
            loadComponent: () => import("./home/home.component")
                .then(c => c.HomeComponent), title: "Home"
        },
        {
            path: "about",
            loadComponent: () => import("./about/about.component")
                .then(c => c.AboutComponent), title: "Home"
        },
        { path: "contact", component:ContactComponent},
        { path: "blogs", component:BlogComponent},
        { path: "blog-single", component:BlogSingalComponent},
        { path: "registration", component:RegistrationComponent},

        { path: "shop", component:ShopComponent},
        { path: "shop-single", component:ShopSingleComponent},
        { path: "checkout", component:CheckOutComponent},
        { path: "cart", component:CartComponent},
        // { path: "admin", component:AdminLoginComponent},
      
    ]
},
{
    path: 'admin', component: AdminLayoutComponent,  // Use AdminLayoutComponent
    children: [
        { path: '', component: AdminLoginComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(outerPagesRoutes)],
  exports: [RouterModule]
})
export class OuterPageRoutingModule { }
