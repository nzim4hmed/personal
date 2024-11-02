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

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 400:
            // Bad Request
            console.error('Bad Request:', error.message);
            // Handle 400 errors (optional: show message to user)
            break;
          case 401:
            // Unauthorized
            console.error('Unauthorized, logging out.');
            this.authenticationService.logout();
            // Optional: redirect to login page
            break;
          case 403:
            // Forbidden
            console.error('Access Denied:', error.message);
            // Optional: handle forbidden case, like showing an alert
            break;
          case 404:
            // Not Found
            console.error('Resource Not Found:', error.message);
            // Optional: handle 404 errors (navigate to a 404 page, etc.)
            break;
          case 500:
            // Internal Server Error
            console.error('Server Error:', error.message);
            // Handle server errors, show a generic error message to the user
            break;
          case 409:
            // Internal Server Error
            console.error('User not active');

            this._alert.swalPopError('Error: Sponsor is not active');
            // Handle server errors, show a generic error message to the user
            break;
          default:
            // Handle other error statuses
            console.error(`Error Status: ${error.status}`, error.message);
        }

        // Pass the error to the caller
        return throwError(() => new Error(error.message));
      })
    );
  }

}
