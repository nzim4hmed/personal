import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AlertService } from 'src/app/common/services/common-service/alert.service';
import { ProductsService } from 'src/app/common/services/superAdminService/products.service';

import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-place-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  shippingform!: FormGroup
  hide: boolean = true; // This controls the visibility of the password

  unsubscribe: Subject<any> = new Subject();
  userDetails: any
  loginDetail: any
  completeaddress: any
  allCheckoutProducts: Array<any>=[]
  grandTotal: any

  previewpath = environment.fileUrl;
  constructor(
    private _fb: FormBuilder,
    private _alert: AlertService,
    private _productService: ProductsService,

    private _router: Router,
    private _authService: AuthenticationService,
  ) {

  }
  ngOnInit() {

    this.userDetails = this._authService.getLoginUserData();
    console.log(this.userDetails);
    this.getAllCartProducts()

    this.shippingform = this.addUser()
  }



  getAllCartProducts() {
    this._productService.getCartList(this.userDetails.id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status == 'success') {


          this.allCheckoutProducts = res.data.data;


          console.log(JSON.stringify(this.allCheckoutProducts) === '{}');
          console.log(this.allCheckoutProducts);


          const grandTotal = this.allCheckoutProducts.reduce((acc: number, item: { total_price: string; }) => acc + parseFloat(item.total_price), 0);
          this.grandTotal = grandTotal
          console.log('Grand Total:', grandTotal);
        }
      },
      error: (err: any) => {

      }
    });
  }


  addUser() {
    return this._fb.group({
      sponsor_id: [{ value: this.userDetails?.sponsor_id || '', disabled: true }],
      name: [{ value: this.userDetails?.name || '', disabled: true }],
      address: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      pincode: ['', Validators.required],
      landmark: [''],

    })
  }
  getFormattedwhole(): string {
    const { address, state, city, pincode, landmark } = this.completeaddress;
    return `
      ${address}
      ${landmark ? 'Landmark: ' + landmark : ''}
      ${city}, ${state} - ${pincode}
    `.trim();
  }

  createOrderObject() {
    const shipping_address = this.getFormattedwhole();
    return {
      user_id: this.userDetails.id,
      cart_id: this.allCheckoutProducts.map((product: any) => product.id),
      shipping_address: shipping_address,
    };
  }
  createOrderObjectForOrderPlace() {
    return {
      user_id: this.userDetails.id,
      checkout_ids: this.allCheckoutProducts.map((product: any) => product.id),
    };
  }



  saveUserDetails(formVal: any) {
    console.log(formVal.value);
    this.completeaddress = formVal.value
    console.log(this.shippingform.controls);
    console.log(this.createOrderObject());


    if (!this.shippingform.valid) {
      this._alert.swalPopError('Please enter valid input');
      this.shippingform.markAllAsTouched();
    } else {

      // const formattedAddress = this.getFormattedwhole();


      this._productService.checkout(this.createOrderObject()).subscribe({
        next: (res: any) => {
          console.log(res);
          
          if (res.data != '') {
            // this._alert.showConfirmationforReg('Welcome to the ALWAYS GEENLIVE Family!', res.results.data.sponsor_id, res.results.data.password, 'Confirm');
            this._alert.swalPopSuccess('Address Updated Successfully');
            this.shippingform.disable();
            // this._router.navigate(['home']);
            // this.loginPopUp();b

          } else if (res.error == true) {
            this._alert.swalPopError(res.message);
          }
        }
      })
    }
  }



  orderPaced(formVal: any) {

    this._productService.orderPlaced(this.createOrderObjectForOrderPlace()).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {

        if (res.data != null && res.data == true) {
          this._alert.swalPopSuccess('Order placed successfully');
          this._router.navigate(['User/product/order-list']);
        }
      }
    })

  }




}
