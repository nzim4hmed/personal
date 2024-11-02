import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamTreeStructureComponent } from './team-tree-structure/team-tree-structure.component';
@Component({
  template: `<router-outlet></router-outlet>`,
})

export class teamComponent { }


const TeamRoutes: Routes = [
  {
      path: '', component: teamComponent, children: [
          { path: '', redirectTo: 'my-team', pathMatch: 'full' },
           { path: 'my-team', component:TeamTreeStructureComponent },
          //  { path: 'add-product', component: AddProductComponent},
          
      ]
  }
]

@NgModule({
  declarations: [teamComponent],
  imports: [CommonModule, RouterModule.forChild(TeamRoutes)]
})
export class MyTeamModule { }
