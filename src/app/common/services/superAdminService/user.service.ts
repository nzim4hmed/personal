import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private _http: HttpClient
  ) { }




    getAllOrderByUserID(sponsor_id:number) {
        return this._http.get(`${environment.genXApiURL}admin/get-order-by-user/${sponsor_id}`)
      }


   
      


}
