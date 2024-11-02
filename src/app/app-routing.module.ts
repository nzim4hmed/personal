import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './common/_helpers/Guards/auth.guard';
import { PageNotFoundComponent } from './common/components/modal-outer-page/page-not-found/page-not-found.component';

const routes: Routes = [
  { 
    // canActivate: [AuthGuard],
    path: '', loadChildren: () => import("../app/outer-page/outer-page.module").then(event => event.OuterPageModule) },

  {
    canActivate: [AuthGuard],
    path: '', loadChildren: () => import("../app/inner-page/inner-page.module").then(event => event.InnerPageModule)
  },
   { path: 'pagenot-found', component: PageNotFoundComponent },
   { path: '**', redirectTo: 'pagenot-found', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
