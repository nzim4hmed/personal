import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { CartDataService } from 'src/app/common/services/superAdminService/cartdata.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  quantity: number = 1; // Default quantity



  prefixviewPath = environment.fileUrl
  productList: Array<any> = [];
  cartForm!: FormGroup
  userDetails: any

  // dataSource = ELEMENT_DATA;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private fb: FormBuilder,
    private cartService: CartDataService,
    private _authService: AuthenticationService,
    private _alert: AlertService,
  ) { }
  ngOnInit() {
    this.userDetails = this._authService.getLoginUserData()
    this.getproductListData();
    this.cartForm = this.addtoCartform()

  }

  addtoCartform() {
   return  this.fb.group({
    sponsor_id: [this.userDetails.sponsor_id],
    user_id: [this.userDetails.id],
    product_id: [''],
    quantity_of_product: [1, Validators.required],
    price_per_unit: [''],
    discount: [0],
    status: ['Active']
    });
  }

  getproductListData() {
    this._productService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.productList = res.data.products;
        console.log(this.productList);
      }
    })
  }


  navigateToCart(product:any) {
    console.log(product);
    this.cartForm.patchValue({
      product_id: product.id,
      quantity_of_product: this.cartForm.get('quantity_of_product')?.value,
      price_per_unit: +product.mrp,
    });
    console.log(this.cartForm.value);

    if (!this.cartForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.cartForm.markAllAsTouched();

    } else {
      console.log(this.cartForm.value);
      
      
      this._productService.addToCartProduct(this.cartForm.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status == 'success') {
            // this.cartForm.reset();
            // this._router.navigate(['Admin/product/product-list']);
            this._alert.swalPopSuccess(res.message)
            this.cartService.incrementCartCount();
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }
    
    // this._router.navigate(['User/product/cart']);
  }

  // ngOnInit() {
  //   this.userDetails = this._authService.getLoginUserData();
  //   this.cartForm = this.createCartForm();
  //   this.getProductListData();
  // }

  // createCartForm() {
  //   return this._fb.group({
  //     addtocart: this._fb.array([])
  //   });
  // }

  // get productCartDetailsFormArray() {
  //   return this.cartForm.get('addtocart') as FormArray;
  // }

  // getProductListData() {
  //   this._productService.getProductList().pipe(takeUntil(this.unsubscribe)).subscribe({
  //     next: (res: any) => {
  //       this.productList = res.results.products;
  //       this.productList.forEach(product => {
  //         this.productCartDetailsFormArray.push(this.createProductFormGroup(product));
  //       });
  //     }
  //   });
  // }

  // createProductFormGroup(data: any) {
  //   return this._fb.group({
  //     sponsor_id: [this.userDetails.sponsor_id],
  //     user_id: [this.userDetails.id],
  //     product_id: [data.id],
  //     quantity_of_product: ['', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
  //     price_per_unit: [data.mrp],
  //     discount: [0],
  //     status: ['active']
  //   });
  // }

  // navigateToCart(index: number) {
  //   const productForm = this.productCartDetailsFormArray.at(index);
  //   if (productForm.valid) {
  //     this.saveCartData(productForm.value);
  //   } else {
  //     productForm.markAllAsTouched();
  //   }
  // }

  // saveCartData(cartData: any) {
  //   console.log(cartData);
    
  //   this._productService.saveCart(cartData).pipe(takeUntil(this.unsubscribe)).subscribe({
  //     next: (response: any) => {
  //       if (response.success) {
  //         this._alert.success('Product added to cart successfully!');
  //         this._router.navigate(['/cart']);
  //       } else {
  //         this._alert.error('Failed to add product to cart.');
  //       }
  //     },
  //     error: (err: any) => {
  //       this._alert.error('An error occurred while adding the product to the cart.');
  //     }
  //   });
  // }



}
