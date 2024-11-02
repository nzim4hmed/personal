import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CartDataService } from 'src/app/common/services/superAdminService/cartdata.service';

@Component({
  selector: 'app-inner-layout-header',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatIconModule,MatBadgeModule],
  templateUrl: './inner-layout-header.component.html',
  styleUrls: ['./inner-layout-header.component.scss']
})
export class InnerLayoutHeaderComponent implements OnInit {
  constructor(
    private _authService : AuthenticationService,
    private cartService: CartDataService
  ){}
  userDetails :any

  cartCount: number = 0;

 
  ngOnInit() {
   this.userDetails = this._authService.getLoginUserData();
   this.cartService.currentCartCount.subscribe(count => {
    this.cartCount = count;
  });
   console.log('header', this.userDetails);
   
  }

  onLogOut() {
    this._authService.logout();
  }
}
