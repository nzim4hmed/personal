import { Component } from '@angular/core';
import { UserDataService } from './inner-page/users-module/user.dataservice';
import { delay, startWith } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GenX';

  constructor(private _loaderStat : UserDataService){}



  loaderStatus$ = this._loaderStat.loader$.pipe(
    startWith(null),
    delay(0)
  );
}
