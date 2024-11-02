import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';


@Component({
  template: `<router-outlet></router-outlet>`,
})

export class ProductComponent { }


const ICompAthleteRoutes: Routes = [
  {
      path: '', component: ProductComponent, children: [
          { path: '', redirectTo: 'product-list', pathMatch: 'full' },
           { path: 'product-list', component:ProductListComponent },
           { path: 'add-product', component: AddProductComponent},
          
      ]
  }
]

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,RouterModule.forChild(ICompAthleteRoutes)
  ]
})
export class ProductModule { }
