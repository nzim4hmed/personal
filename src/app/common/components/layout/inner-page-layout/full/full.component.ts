import {ChangeDetectorRef, AfterViewInit, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { InnerLayoutHeaderComponent } from "../inner-layout-header/inner-layout-header.component";
import { MediaMatcher } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import { SidenavComponent } from "../sidenav/sidenav.component";

// import { MenuItems } from '../../shared/menu-items/menu-items';

@Component({
    selector: 'app-full',
    standalone: true,
    templateUrl: './full.component.html',
    styleUrls: ['./full.component.scss'],
    imports: [CommonModule, MaterialModule, InnerLayoutHeaderComponent, RouterModule, SidenavComponent]
})
export class FullComponent implements OnDestroy, AfterViewInit{
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    // public menuItems: MenuItems
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 1024px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  ngAfterViewInit() {}
}
