import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterLayoutFooterComponent } from "../../layout/outer-page-layout/outer-layout-footer/outer-layout-footer.component";
import { OuterLayoutHeaderComponent } from "../../layout/outer-page-layout/outer-layout-header/outer-layout-header.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, OuterLayoutFooterComponent, OuterLayoutHeaderComponent, RouterModule],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

}
