import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CategoryComponent } from './category/category.component';




@Component({
  template: `<router-outlet></router-outlet>`,
})

export class MasterComponent { }


const MasterRoutes: Routes = [
  {
      path: '', component: MasterComponent, children: [
          { path: '', redirectTo: 'category', pathMatch: 'full' },
           { path: 'category', component:CategoryComponent },
          //  { path: 'add-product', component: AddProductComponent},
          
      ]
  }
]

@NgModule({
  declarations: [MasterComponent],
  imports: [
    CommonModule,RouterModule.forChild(MasterRoutes)
  ]
})
export class MasterModule { }
