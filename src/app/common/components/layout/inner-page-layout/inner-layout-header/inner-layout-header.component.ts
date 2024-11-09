import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import { MaterialModule } from 'src/app/material.module';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { MatBadgeModule } from '@angular/material/badge';
import { CartDataService } from 'src/app/common/services/superAdminService/cartdata.service';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';

@Component({
  selector: 'app-inner-layout-header',
  standalone: true,
  imports: [CommonModule,MaterialModule, MatIconModule,MatBadgeModule, RouterModule],
  templateUrl: './inner-layout-header.component.html',
  styleUrls: ['./inner-layout-header.component.scss']
})
export class InnerLayoutHeaderComponent implements OnInit {
  constructor(
    private _authService : AuthenticationService,
    private cartService: CartDataService,
    private _productService: ProductsService,
  ){}
  userDetails :any
  unsubscribe: Subject<any> = new Subject();


  cartCount: number = 0;
  cartproduct: Array<any> = [];

 
  ngOnInit() {
   this.userDetails = this._authService.getLoginUserData();
   this.cartService.currentCartCount.subscribe(count => {
    this.cartCount = count;
    // if(this.cartCount ==0){

      this.getProductListData()
    // }
  });
   console.log('header', this.userDetails);
   
  }
  getProductListData() {
    this._productService.getCartList(this.userDetails.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        
        console.log(res);

        this.cartproduct = res.data.data;


        this.totalCountProduct(this.cartproduct);
      },
      error: (err: any) => {
        console.log(err);

      }
    });
  }
  totalCountProduct(cartData:any) {

    if (cartData) {
      const totalQuantity = cartData.reduce((total: number, item: CartItem) => total + item.quantity, 0);
      console.log("Total Quantity:", totalQuantity);
      this.cartCount = totalQuantity
      
    } else {
      console.log("cartData or cartData.data is not available");
    }
  }
  

  onLogOut() {
    this._authService.logout();
  }
}

interface Product {
  id: number;
  product_name: string;
  description: string;
  product_image: string;
  mrp: string;
  dp: string;
  business_volume: string;
  category_id: number;
  sales_point_value: string;
  stock_type: string;
  stock_qty: number;
  tax_rate: string;
}

interface CartItem {
  id: number;
  sponsor_id: string;
  user_id: number;
  product_id: number;
  quantity: number;
  date_added: string;
  price_per_unit: number;
  status: string;
  discount: number;
  total_price: number;
  created_at: string;
  updated_at: string;
  product: Product;  // Nested product information
}

interface CartData {
  data: CartItem[];
}