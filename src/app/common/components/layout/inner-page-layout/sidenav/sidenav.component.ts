import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { RouterModule } from '@angular/router';


import { MediaMatcher } from '@angular/cdk/layout';
import { MenuItems } from '../../../../../shared/menu-items/menu-items';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { CapitalizePipe } from 'src/app/common/pipes/capitalize.pipe';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MaterialModule, NgFor, NgIf, RouterModule, CapitalizePipe],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  userDetails: any
  role!: string;
  constructor(
    private _authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.userDetails = this._authService.getLoginUserData()
    console.log(this.userDetails);
    this.role = this.userDetails.role

  }
  // mobileQuery: MediaQueryList;
  panelOpenState = false;


  // Admin Routes Links

  adminDashboard: any[] = [
    { state: "AdminDashboard", name: "Dashboard", type: 'link', icon: 'dashboard' },
  ]

  adminMocLinks: any[] = [
    { state: "Admin/product/add-product", name: "Add Product", type: 'link', icon: 'add_box' },
    { state: "Admin/product/product-list", name: "Product List", type: 'link', icon: 'view_list' },
  ]
  masterLinks: any[] = [
    { state: "Admin/master/category", name: "Add Category", type: 'link', icon: 'add_box' },
  ]
  usersLinks: any[] = [
    { state: "Admin/users/user-list", name: "User List", type: 'link', icon: 'view_list' },
  ]
 allOrdersLinks: any[] = [
    { state: "Admin/orders/all-orders", name: "All Orders List", type: 'link', icon: 'view_list' },
  ]



  // userRoutes Links
  userDashboard: any[] = [
    { state: "UserDashboard", name: "Dashboard", type: 'link', icon: 'person' },
  ]

  userMocLinks: any[] = [
    { state: "User/product/product-list", name: "Purchase Order", type: 'link', icon: 'view_list' },
    { state: "User/product/cart", name: "cart", type: 'link', icon: 'add_box' },
    { state: "User/product/order-list", name: "Order History", type: 'link', icon: 'add_box' },
  ]
  TeamLinks: any[] = [
    { state: "User/team/my-team", name: "My Team", type: 'link', icon: 'view_list' },
    // { state: "User/product/cart", name: "cart", type: 'link', icon: 'add_box' },
  ]
  profileLinks: any[] = [
    { state: "User/profile/profile-update", name: "Edit Profile", type: 'link', icon: 'person' },
    { state: "User/profile/kyc", name: "Kyc Details", type: 'link', icon: 'person' },

  ]


  // private _mobileQueryListener: () => void;

  // constructor(
  //   changeDetectorRef: ChangeDetectorRef,
  //   media: MediaMatcher,
  //   public menuItems: MenuItems
  // ) {
  //   this.mobileQuery = media.matchMedia('(min-width: 768px)');
  //   this._mobileQueryListener = () => changeDetectorRef.detectChanges();
  //   this.mobileQuery.addListener(this._mobileQueryListener);
  // }

  // ngOnDestroy(): void {
  //   this.mobileQuery.removeListener(this._mobileQueryListener);
  // }


  get AdminRole() { return (this.userDetails.role === 'admin') ? true : false }
  get userRole() { return (this.userDetails.role === 'user') ? true : false }

  onLogOut() {
    this._authService.logout();
  }

}
