import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { AlertService } from 'src/app/common/services/common-service/alert.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  quantity: number = 1; // Default quantity
  grandTotal!: number


  prefixviewPath = environment.fileUrl
  cartproduct: Array<any> = [];
  cartForm!: FormGroup
  userDetails: any

  // dataSource = ELEMENT_DATA;
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _productService: ProductsService,
    private _router: Router,
    private fb: FormBuilder,
    private _fb: FormBuilder,
    private _authService: AuthenticationService,
    private _alert: AlertService,
  ) { }
  ngOnInit() {
    this.userDetails = this._authService.getLoginUserData();
    console.log(this.userDetails);
    
    this.cartForm = this.createCartForm();
    this.getProductListData();
  }


  createCartForm() {
    return this._fb.group({
      addtocart: this._fb.array([])
    });
  }

  get productCartDetailsFormArray() {
    return this.cartForm.get('addtocart') as FormArray;
  }

  getProductListData() {
    this._productService.getCartList(this.userDetails.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        
        console.log(res);
        this.productCartDetailsFormArray.clear()
        this.cartproduct = res.data.data;

        this.cartproduct.forEach(product => {
          this.productCartDetailsFormArray.push(this.createProductFormGroup(product));
        });
        this.updateTotalPrice();
      },
      error: (err: any) => {
        console.log(err);
        if (err.status === 404) {
          // this._alert.swalPopError(err.error.message);
          this.grandTotal = 0;
          this.productCartDetailsFormArray.clear()
        } else {
          this._alert.swalPopError('An error occurred: ' + err.message);
        }
      }
    });
  }

  createProductFormGroup(data: any) {
    console.log(data);

    return this._fb.group({
      id:[data?.id],
      sponsor_id: [this.userDetails.sponsor_id],
      user_id: [data.user_id ||  this.userDetails.id],
      product_id: [data.product_id],
      quantity_of_product: [data?.quantity || '', [Validators.required, Validators.min(1), Validators.pattern(/^[0-9]*$/)]],
      price_per_unit: [data?.price_per_unit],
      discount: [0],
      status: [data?.status || 'active'],

      total_price: [data?.total_price],
      product_image: [data?.product?.product_image],
      product_name: [data?.product?.product_name],
      mrp: [data?.product?.mrp],
      stock_qty: [data?.product?.stock_qty],

    });
  }


  navigateToCart(product: any) {
    console.log(product);
    this.cartForm.patchValue({
      product_id: product.id,
      quantity_of_product: this.cartForm.get('quantity_of_product')?.value,
      price_per_unit: product.mrp,
    });
    console.log(this.cartForm.value);

    if (!this.cartForm.valid) {
      this._alert.swalPopError("Please fill valid input!");
      this.cartForm.markAllAsTouched();

    } else {
      this._productService.addToCartProduct(this.cartForm.value).pipe(takeUntil(this.unsubscribe)).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.success == true) {

            // this._router.navigate(['Admin/product/product-list']);
            this._alert.swalPopSuccess(res.message)
          } else {
            this._alert.swalPopError('something went wrong')
          }
        }
      })

    }

    // this._router.navigate(['User/product/cart']);
  }



  increaseQuantity(index: number): void {
    const quantityControl = this.getProductControl(index).get('quantity_of_product');
    console.log(quantityControl);
    console.log(this.getProductControl(index).value);

    const currentQuantity = quantityControl?.value || 1;
    quantityControl?.setValue(currentQuantity + 1);

    const transformedProduct = this.convertProduct(this.getProductControl(index).value, 1);


    this._productService.addToCartProduct(transformedProduct).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 'success') {
          console.log("success");
          this.getProductListData()

          // this._alert.swalPopSuccess(res.message)

        } else {
          console.log("error");

          this._alert.swalPopError('something went wrong')
        }
      }
    })



  }

  convertProduct(original: any, qnt: number) {
    return {
      discount: original.discount,
      price_per_unit: original.price_per_unit,
      product_id: original.product_id, // Assuming you want to keep this unchanged
      quantity_of_product: qnt, // Assuming you want to keep this unchanged
      sponsor_id: original.sponsor_id,
      status: original.status,
      user_id: original.user_id
    };
  }

  decreaseQuantity(index: number): void {
    const quantityControl = this.getProductControl(index).get('quantity_of_product');
    const currentQuantity = quantityControl?.value || 1;
    if (currentQuantity > 1) {
      quantityControl?.setValue(currentQuantity - 1);
    }

    const transformedProduct = this.convertProduct(this.getProductControl(index).value, -1);


    this._productService.addToCartProduct(transformedProduct).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 'success') {
          console.log("success");
          this.getProductListData()
          // this._alert.swalPopSuccess(res.message)
        } else {
          console.log("error");

          this._alert.swalPopError('something went wrong')
        }
      }
    })
  }

  onQuantityChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    let value = parseInt(inputElement.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1;
    }
    this.getProductControl(index).get('quantity_of_product')?.setValue(value);
  }

  getQuantity(index: number): number {
    return this.getProductControl(index).get('quantity_of_product')?.value || 1;
  }

  private getProductControl(index: number) {
    return this.productCartDetailsFormArray.at(index);
  }

  navigateToShop() {
    this._router.navigate(['User/product/product-list'])
  }


  updateTotalPrice() {

    const formGroup = this.productCartDetailsFormArray
    const formArray = this.cartForm.get('productCartDetailsFormArray') as FormArray;
    console.log(formArray);
    const grandTotal = formGroup.value.reduce((acc: number, item: { total_price: string; }) => acc + parseFloat(item.total_price), 0);
    this.grandTotal = grandTotal
    console.log('Grand Total:', grandTotal);

    // const totalPriceControl = formGroup.get('total_price');
    console.log(formGroup.value);

  }

  deleteCart(productid:any){
    this._productService.deleteFromCart(productid).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 'success') {
          console.log("success");
          this.getProductListData()
          // this._alert.swalPopSuccess(res.message)
        } else {
          console.log("error");

          this._alert.swalPopError('something went wrong')
        }
      }
    })
  }


  placeOrder(){
    console.log('placeOrder');
    this._router.navigate(['User/product/checkout'])
    
  }



}
