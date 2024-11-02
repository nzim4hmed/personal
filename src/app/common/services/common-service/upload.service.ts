import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(
    private _http : HttpClient
  ) { }





  upload(formData: any) {
    return this._http.post(`${environment.genXApiURL}file/upload`, formData)
   
  }
  paymentInfoUpload(formData: any) {
    return this._http.post(`${environment.genXApiURL}product/submit-payment-info/screenshot`, formData)
   
  }
}
