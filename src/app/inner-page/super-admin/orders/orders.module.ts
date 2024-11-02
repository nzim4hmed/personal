import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllOrderListStatusComponent } from './all-order-list-status/all-order-list-status.component';




@Component({
  template: `<router-outlet></router-outlet>`,
})

export class AllOrdersListComponent { }


const ICompAthleteRoutes: Routes = [
  {
    path: '', component: AllOrdersListComponent, children: [
      { path: '', redirectTo: 'all-orders', pathMatch: 'full' },
      { path: 'all-orders', component: AllOrderListStatusComponent },


    ]
  }
]

@NgModule({
  declarations: [AllOrdersListComponent],
  imports: [
    CommonModule, RouterModule.forChild(ICompAthleteRoutes)
  ]
})
export class OrdersModule { }
