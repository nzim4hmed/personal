import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';
import { UserService } from 'src/app/common/services/superAdminService/user.service';
import { Subject, takeUntil } from 'rxjs';
import { MaterialModule } from 'src/app/material.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthServiceService } from 'src/app/common/services/authServices/auth-service.service';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, MaterialModule, MatExpansionModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {



  summaryCards: Array<any> = []
  userAvatar = 'path/to/avatar/image'; // Set the user avatar path



  walletData: any
  userDetails: any
  userData: any
  unsubscribe: Subject<any> = new Subject();
  constructor(
    private _authenticationService: AuthenticationService,
    private _userService: UserService,
    private _authservice: AuthServiceService,
  ) { }
  ngOnInit(): void {
    this.userDetails = this._authenticationService.getLoginUserData()
    console.log(this.userDetails);
    this.getwallet()
    this.getUserDetailById()

  }

  getwallet() {
    this._userService.getWalletByUser(this.userDetails.sponsor_id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.walletData = res?.data?.wallet


        console.log(this.walletData);

        if (this.walletData) {
          this.summaryCards = [
            { title: 'Total BV', value: this.walletData?.total_bv, icon: 'bar_chart', iconBgColor: '#ffffff', BgColor: '#4CAF50', iconColor: '#4CAF50' },
            { title: 'Direct Income', value: this.walletData.direct_income, icon: 'monetization_on', iconBgColor: '#ffffff', BgColor: '#2196F3', iconColor: '#2196F3' },
            { title: 'Level Income', value: this.walletData.level_income, icon: 'trending_up', iconBgColor: '#ffffff', BgColor: '#FF9800', iconColor: '#FF9800' },
             { title: 'Personal Bonus', value: this.walletData.personal_bonus, icon: 'card_giftcard', iconBgColor: '#ffffff', BgColor: '#9C27B0', iconColor: '#9C27B0' },
            { title: 'Total Income', value: this.calculateTotalIncome(), icon: 'account_balance_wallet', iconBgColor: '#ffffff', BgColor: '#FF5722', iconColor: '#FF5722' },
            { title: 'Total Spent', value: this.walletData.total_spent, icon: 'shopping_cart', iconBgColor: '#ffffff', BgColor: '#F44336', iconColor: '#F44336' }
          ];
        }

      }, error: (err: any) => {
        console.log('error', err);
      }
    })
  }


  calculateTotalIncome(): number {
    const directIncome = Number(this.walletData?.direct_income || 0);
    const levelIncome = Number(this.walletData?.level_income || 0);
    return directIncome + levelIncome;
  }

  getUserDetailById(){
    this._authservice.verifybySponsorId(this.userDetails.sponsor_id).pipe(takeUntil(this.unsubscribe)).subscribe({
      next: (res: any) => {
        console.log(res);
        this.userData = res?.data


      }, error: (err: any) => {
        console.log('error', err);
      }
    })
  }

}
