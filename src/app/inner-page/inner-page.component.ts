import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { InnerLayoutHeaderComponent } from "../common/components/layout/inner-page-layout/inner-layout-header/inner-layout-header.component";
import { MatCardModule } from '@angular/material/card';
import { FullComponent } from "../common/components/layout/inner-page-layout/full/full.component";

@Component({
    selector: 'app-inner-page',
    standalone: true,
    templateUrl: './inner-page.component.html',
    styleUrls: ['./inner-page.component.scss'],
    imports: [CommonModule, RouterModule, InnerLayoutHeaderComponent, MatCardModule, FullComponent]
})
export class InnerPageComponent {

}
