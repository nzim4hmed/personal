import { Injectable, inject } from '@angular/core';
import { HttpRequest ,HttpHandler ,HttpEvent , HttpInterceptor } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { UserDataService } from 'src/app/inner-page/users-module/user.dataservice';



@Injectable({
  providedIn:'root'
})
export class LoadingInterceptor implements HttpInterceptor {

  readonly _dataService = inject(UserDataService);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this._dataService.setLoaderFlag(true);
    return next.handle(request).pipe(
      finalize( () =>{
        this._dataService.setLoaderFlag(false);
      } )
    );
  }
}