import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OuterLayoutHeaderComponent } from "../common/components/layout/outer-page-layout/outer-layout-header/outer-layout-header.component";
import { OuterLayoutFooterComponent } from "../common/components/layout/outer-page-layout/outer-layout-footer/outer-layout-footer.component";
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-outer-page',
    standalone: true,
    templateUrl: './outer-page.component.html',
    styleUrls: ['./outer-page.component.scss'],
    imports: [CommonModule, OuterLayoutHeaderComponent, OuterLayoutFooterComponent,RouterModule]
})
export class OuterPageComponent {

}
