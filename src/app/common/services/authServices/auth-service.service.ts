import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  constructor(
    private _http: HttpClient
  ) { }

  registration(formData: any) {
    return this._http.post(`${environment.genXApiURL}auth/signup`, formData)
  }

  login(formData: any) {
    return this._http.post(`${environment.genXApiURL}auth/login`, formData)
  }
 

  verifySponsorId(sponsorId: any) {
    return this._http.get(`${environment.genXApiURL}user/user-tree/${sponsorId}`)

  }
  verifybySponsorId(sponsorId: any) {
    return this._http.get(`${environment.genXApiURL}user/get-user/${sponsorId}`)
  }
  
}
