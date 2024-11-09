import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { AuthenticationService } from 'src/app/common/services/common-service/authentication.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatTabsModule, MatIconModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  data = {
    total_bv: "1900",
    total_lp: "0",
    direct_income: "0",
    level_income: "0",
    personal_bonus: "0",
    total_spent: "3242",
    di_distributed: false,
    total_income: "0",
    createdAt: "2024-10-29T16:56:30.719Z",
    updatedAt: "2024-10-30T19:21:02.855Z"
  };

  summaryCards = [
    { title: 'Total BV', value: this.data.total_bv, icon: 'bar_chart', iconBgColor: '#ffffff', BgColor: '#4CAF50', iconColor: '#4CAF50'},
    { title: 'Direct Income', value: this.data.direct_income, icon: 'monetization_on', iconBgColor: '#ffffff', BgColor: '#2196F3', iconColor: '#2196F3' },
    { title: 'Level Income', value: this.data.level_income, icon: 'trending_up', iconBgColor: '#ffffff', BgColor: '#FF9800', iconColor: '#FF9800'},
    { title: 'Personal Bonus', value: this.data.personal_bonus, icon: 'card_giftcard', iconBgColor: '#ffffff', BgColor: '#9C27B0', iconColor: '#9C27B0' },
    { title: 'Total Income', value: this.data.total_income, icon: 'account_balance_wallet', iconBgColor: '#ffffff', BgColor: '#FF5722', iconColor: '#FF5722' },
    { title: 'Total Spent', value: this.data.total_spent, icon: 'shopping_cart', iconBgColor: '#ffffff', BgColor: '#F44336', iconColor: '#F44336' }
  ];
  contactsData: Contact[];
  activityData: Activity[];
  userDetails:any

  constructor(  private _authenticationService: AuthenticationService,) {
    this.activityData = activities;
    this.contactsData = contacts;
  
  }



  ngOnInit(): void {
    this.userDetails = this._authenticationService.getLoginUserData()
    console.log(this.userDetails);
  }

  





}


export interface Contact {
  image: string;
  class: string;
  name: string;
  email: string;
}

export const contacts: Contact[] = [
  {
      image: 'assets/images/users/1.jpg',
      class: 'online',
      name: 'Pavan kumar',
      email: 'info@wrappixel.com'
  },
  {
      image: 'assets/images/users/2.jpg',
      class: 'busy',
      name: 'Sonu Nigam',
      email: 'pamela1987@gmail.com'
  },
  {
      image: 'assets/images/users/4.jpg',
      class: 'offline',
      name: 'Pavan kumar',
      email: 'kat@gmail.com'
  },
  {
      image: 'assets/images/users/5.jpg',
      class: 'online',
      name: 'Andrew',
      email: 'info@wrappixel.com'
  },
  {
      image: 'assets/images/users/6.jpg',
      class: 'busy',
      name: 'Jonathan Joe',
      email: 'jj@gmail.com'
  },
]

export interface Activity{
  name:string;
  image:string;
  commentTime:string;
  comment:string;

  bottomImage:string;
  buttonColor:string;

}

export const activities:Activity[]=[
  {
      name:'Nirav joshi',
      image:'assets/images/users/1.jpg',
      commentTime:'5 minute ago',
      comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  
      bottomImage:'assets/images/big/img2.jpg',
      buttonColor:''
  
  },
  {
      name:'Sunil joshi',
      image:'assets/images/users/2.jpg',
      commentTime:'3 minute ago',
      comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  
      bottomImage:'',
      buttonColor:'primary'
  
  },
  {
      name:'Vishal Bhatt',
      image:'assets/images/users/3.jpg',
      commentTime:'1 minute ago',
      comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  
      bottomImage:'assets/images/big/img1.jpg',
      buttonColor:''
  
  },
  {
      name:'Dhiren Adesara',
      image:'assets/images/users/4.jpg',
      commentTime:'7 minute ago',
      comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
  
      bottomImage:'',
      buttonColor:'warn'
  
  }

]