import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';


@Component({
  template: `<router-outlet></router-outlet>`,
})

export class userComponent { }


const ICompAthleteRoutes: Routes = [
  {
      path: '', component: userComponent, children: [
          { path: '', redirectTo: 'user-list', pathMatch: 'full' },
           { path: 'user-list', component:UserListComponent },
          //  { path: 'add-product', component: AddProductComponent},
          
      ]
  }
]


@NgModule({
  declarations: [userComponent],
  imports: [
    CommonModule, RouterModule.forChild(ICompAthleteRoutes)
  ]
})
export class UserDetailModule { }
