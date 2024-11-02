import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../../services/common-service/authentication.service';
import { environment } from 'src/environments/environment';


export const AuthGuard: CanActivateFn = (route, state): any => {
  const _authentication = inject(AuthenticationService);
  const _router = inject(Router);


  console.log(_authentication.getToken());

  if (_authentication.getToken()) {
    return true;
  } else {
    _router.navigate(['/'])
    return false;
  }
}

// export const AuthGuard: CanActivateFn = (route, state) => {
//   const _authentication = inject(AuthenticationService);
//   const _router = inject(Router);

//   if (_authentication.getToken()) {
//     // Check if trying to access outer page while logged in
//     if (state.url.includes('/home')) { // Adjust this path as needed
//       _router.navigate(['/']);
//       return false;
//     }
//     return true;
//   } else {
//     _router.navigate(['/']); // Redirect to login if not authenticated
//     return false;
//   }
// };

