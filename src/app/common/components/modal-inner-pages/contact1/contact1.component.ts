import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-contact1',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './contact1.component.html',
  styleUrls: ['./contact1.component.scss']
})
export class Contact1Component {

  
  contactsData: any[];

  constructor() {

    this.contactsData = [
      {
        image: 'assets/images/admin-images/users/1.jpg',
        class: 'online',
        name: 'Pavan kumar',
        email: 'info@wrappixel.com'
    },
    {
        image: 'assets/images/admin-images/users/2.jpg',
        class: 'busy',
        name: 'Sonu Nigam',
        email: 'pamela1987@gmail.com'
    },
    ];
  }

  ngOnInit(): void {
  }

}
