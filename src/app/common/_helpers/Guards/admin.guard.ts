import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/common-service/authentication.service';
import { environment } from 'src/environments/environment';


export const AdminGuard: CanActivateFn = (route, state): any => {
  const _authentication = inject(AuthenticationService);
  const _router = inject(Router);


  console.log(_authentication.getLoginUserData());

  if (_authentication.getLoginUserData().role =='admin') {
    return true;
  } else {
    _router.navigate(['/'])
    return false;
  }
}
