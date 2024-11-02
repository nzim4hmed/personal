import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
  userDetails:any
  constructor(
    private _authenticationService : AuthenticationService
  ){}
  ngOnInit(): void {
    this.userDetails = this._authenticationService.getLoginUserData()
    console.log(this.userDetails);
    
  }

}
