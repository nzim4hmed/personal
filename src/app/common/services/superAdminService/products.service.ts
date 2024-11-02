import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private _http: HttpClient
  ) { }


  deleteProductById(id: number) {
    return this._http.delete(`${environment.genXApiURL}product/products/${id}`)
  }
  deleteCategoryById(id: number) {
    return this._http.delete(`${environment.genXApiURL}product/category/${id}`)
  }
  getProductList() {
    return this._http.get(`${environment.genXApiURL}product/get-products`)
  }
  getCartList(id: number) {
    return this._http.get(`${environment.genXApiURL}product/cart/${id}/Active`)
  }

  getCategoryMaster() {
    return this._http.get(`${environment.genXApiURL}product/categories`)

  }

  addProduct(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/add-or-update-product`, formData)
  }


  addCategory(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/add-product-category`, formData)
  }


  getFile(filename: string) {
    return this._http.get(`${environment.genXApiURL}file/${filename}`, { responseType: 'blob' });
  }








  // user list
  getUsersList() {
    return this._http.get(`${environment.genXApiURL}user/get-users`)

  }



  //add to cart
  addToCartProduct(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/add-to-cart`, formData)
  }
  // deleteFromCart(cartId: number) {
  //   const payload = { cart_id: cartId };
  //    return this._http.delete(`${environment.genXApiURL}delete-cart`,payload)
  // }
  deleteFromCart(cartId: number) {
    const payload = { cart_id: cartId };
    return this._http.request('DELETE', `${environment.genXApiURL}product/delete-cart`, {
      body: payload
    });
  }

  checkout(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/checkout`, formData)
  }
  orderPlaced(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/place-order`, formData)
  }


  // getallorderByID
  getAllOrderByID(id: number) {
    return this._http.get(`${environment.genXApiURL}product/cart/${id}`)
  }
  
  getWallet(id: number) {
    return this._http.get(`${environment.genXApiURL}user/get-wallet/${id}`)
  }

  // https://api.genxsoftwaresolution.com/api/admin/get-order-by-id/1


  // deleteFromCart(cartId: number) {
  //   const params = new HttpParams().set('cart_id', cartId.toString());
  //   return this._http.delete(`${environment.genXApiURL}delete-cart`, { params });
  // }
  // deleteFromCart(cartId: number) {
  //   return this._http.delete(`${environment.genXApiURL}delete-cart/${cartId}`);
  // }


  submitPayment(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/submit-payment-info/details`, formData)
  }

}
