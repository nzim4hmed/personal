import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { PaymentComponent } from './payment/payment.component';
import { OrderListComponent } from './order-list/order-list.component';


@Component({
  template: `<router-outlet></router-outlet>`,
})

export class InternationalCompAthletesComponent { }


const ICompAthleteRoutes: Routes = [
  {
      path: '', component: InternationalCompAthletesComponent, children: [
          { path: '', redirectTo: 'product-list', pathMatch: 'full' },
           { path: 'product-list', component:ProductListComponent },
           { path: 'cart', component:CartComponent },
           { path: 'checkout', component:PlaceOrderComponent },
           { path: 'order-list', component:OrderListComponent },
           { path: 'payment', component:PaymentComponent },
          
      ]
  }
]

@NgModule({
  declarations: [InternationalCompAthletesComponent],
  imports: [
    CommonModule,RouterModule.forChild(ICompAthleteRoutes)
  ]
})
export class ProductsModule { }
