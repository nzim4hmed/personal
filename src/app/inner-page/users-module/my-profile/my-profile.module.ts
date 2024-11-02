import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileUpdateComponent } from './profile-update/profile-update.component';
import { KycUpdateComponent } from './kyc-update/kyc-update.component';


@Component({
  template: `<router-outlet></router-outlet>`,
})

export class profileComponent { }


const TeamRoutes: Routes = [
  {
      path: '', component: profileComponent, children: [
          { path: '', redirectTo: 'profile-update', pathMatch: 'full' },
           { path: 'profile-update', component:ProfileUpdateComponent },
            { path: 'kyc', component: KycUpdateComponent},
          
      ]
  }
]

@NgModule({
  declarations: [profileComponent],
  imports: [CommonModule, RouterModule.forChild(TeamRoutes)]
})
export class MyProfileModule { }
