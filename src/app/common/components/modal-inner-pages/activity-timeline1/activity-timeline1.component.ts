import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-activity-timeline1',
  standalone: true,
  imports: [CommonModule, MatSelectModule,MatTabsModule,MatCardModule, MatFormFieldModule, MatInputModule, MatFormFieldModule,MatDatepickerModule, MatNativeDateModule],
  templateUrl: './activity-timeline1.component.html',
  styleUrls: ['./activity-timeline1.component.scss']
})
export class ActivityTimeline1Component implements OnInit {
  activityData: any[];

  constructor() {

    this.activityData = [
      {
        name:'Nirav joshi',
        image:'assets/images/admin-images/users/1.jpg',
        commentTime:'5 minute ago',
        comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    
        bottomImage:'assets/images/admin-images/big/img2.jpg',
        buttonColor:''
    
    },
    {
        name:'Sunil joshi',
        image:'assets/images/admin-images/users/2.jpg',
        commentTime:'3 minute ago',
        comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    
        bottomImage:'',
        buttonColor:'primary'
    
    },
    {
        name:'Vishal Bhatt',
        image:'assets/images/admin-images/users/3.jpg',
        commentTime:'1 minute ago',
        comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    
        bottomImage:'assets/images/admin-images/big/img1.jpg',
        buttonColor:''
    
    },
    {
        name:'Dhiren Adesara',
        image:'assets/images/admin-images/users/4.jpg',
        commentTime:'7 minute ago',
        comment:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
    
        bottomImage:'',
        buttonColor:'warn'
    
    }
    ];
  }


  ngOnInit(): void {
  }
}
