import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private cartCount = new BehaviorSubject<number>(0);  // Initial cart count is 0
  currentCartCount = this.cartCount.asObservable();

  constructor(
    private _http: HttpClient
  ) { }

  updateCartCount(count: number) {
    this.cartCount.next(count);  // Update the cart count
  }




  // You can use this method to increment the cart count by 1
  incrementCartCount() {
    this.cartCount.next(this.cartCount.value + 1);
  }








}
