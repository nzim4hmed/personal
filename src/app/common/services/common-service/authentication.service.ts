import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  constructor(private _router : Router) {}

  login() {}

  // getsession(sessionId: string, appId: string) {
  //   return this._http.get(`${environment.nsrsApiURL}Login/GetSessionData`, {
  //     params: { sessionId, appId },
  //   });
  // }

  getSessionId() {
    return localStorage.getItem('sessiondata')
      ? JSON.parse(localStorage.getItem('sessiondata')!)?.['sessionId']
      : 'null';
    // return localStorage.getItem('sessiondata') ? JSON.parse(this._encryptionDecryptionService.decryptionAES(localStorage.getItem('sessiondata')))?.['sessionId']:'null';
  }

  getToken() {
    return localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')!) : null;
    // return localStorage.getItem('tokens'); 
  }

  //getting profile data from session storage to show on ui like user name , address and other details
  getProfileData() {
    return localStorage.getItem('sessiondata')
      ? JSON.parse(localStorage.getItem('sessiondata')!)
      : 'null';
  }

  getLoginUserData() {
    return localStorage.getItem('loginUserdata')
      ? JSON.parse(localStorage.getItem('loginUserdata')!)
      : 'null';
  }

  logout() {
     // Remove the token from local storage
     localStorage.removeItem('token');
     localStorage.removeItem('sessiondata');
     localStorage.removeItem('loginUserdata');

     // Navigate to the login page
     this._router.navigate(['/home']);
}
}
