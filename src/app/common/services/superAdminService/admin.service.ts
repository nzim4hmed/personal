import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ADminService {

  constructor(
    private _http: HttpClient
  ) { }


    // getallorderByID
    getAllOrderListToVerify(formData:any) {
        return this._http.put(`${environment.genXApiURL}admin/verify-order-status`,formData )
      }
      // userId
      // orderId
      // orderStatus
      // paymentStatus
      // deleveryDate

    getAllOrder() {
        return this._http.get(`${environment.genXApiURL}admin/get-all-orders`)
      }

      


}
