import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService } from '../services/common-service/authentication.service';
import { AlertService } from '../services/common-service/alert.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService,
    private _alert: AlertService
  ) { }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const authToken = this.authenticationService.getToken();  
  //   const authReq = req.clone({
  //       headers: req.headers
  //         .set('Authorization', `Bearer ${authToken}`)
  //         .set('Accept', 'application/json, text/plain, */*')
  //     });
  //   return next.handle(authReq).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       if (error.status === 401) {
  //         this.authenticationService.logout();
  //       }
  //       return throwError(() => new Error(error.message));
  //     })
  //   );
  // }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const authToken = this.authenticationService.getToken();

    const authReq = req.clone({
      headers: req.headers
        .set('Authorization', `Bearer ${authToken}`)
        // .set('Content-Type', 'application/json')
        .set('Accept', 'application/json, text/plain, */*')
    });

    // return next.handle(authReq).pipe(
    //   catchError((error: HttpErrorResponse) => {
    //     switch (error.status) {
    //       case 400:
    //         console.error('Bad Request:', error.message);
    //         break;
    //       case 401:
    //         console.error('Unauthorized, logging out.');
    //         this.authenticationService.logout();
    //         break;
    //       case 403:
    //         console.error('Access Denied:', error.message);
    //         break;
    //       case 404:
    //         console.error('Resource Not Found:', error.message);
    //         break;
    //       case 500:
    //         console.error('Server Error:', error.message);
    //         break;
    //       case 409:
    //         console.error('User not active');
    //         this._alert.swalPopError('Error: Sponsor is not active');
    //         break;
    //       default:
    //         console.error(`Error Status: ${error.status}`, error.message);
    //     }

    //     return throwError(() => new Error(error.message));
    //   })
    // );
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Extract the error details
        const customError = {
          status: error.status,
          message: error.error?.message || error.message,
          statusCode: error.error?.statusCode || error.status
        };
  
        console.error('Intercepted Error:', customError);
  
        // Rethrow the custom error
        return throwError(() => customError);
      })
    );
  
  }

}
