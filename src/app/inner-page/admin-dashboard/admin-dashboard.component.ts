import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatFormFieldModule, MatSelectModule, MatTabsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  contactsData: Contact[];
  activityData: Activity[];

  constructor() {
    this.activityData = activities;
    this.contactsData = contacts;
  }

  ngOnInit(): void {
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