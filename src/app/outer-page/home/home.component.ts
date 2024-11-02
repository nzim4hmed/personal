import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BannerComponent } from "../../common/components/common-Components/banner/banner.component";
import { TestimonialComponent } from "../../common/components/common-Components/testimonial/testimonial.component";
import { WhoWeAreComponent } from "../../common/components/common-Components/who-we-are/who-we-are.component";
import { CategoriesComponent } from "../../common/components/common-Components/categories/categories.component";
import { FeaturesComponent } from "../../common/components/common-Components/features/features.component";
import { ShopComponent } from "../../common/components/common-Components/shop/shop.component";
import { BlogsComponent } from "../../common/components/common-Components/blogs/blogs.component";

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CommonModule, BannerComponent, TestimonialComponent, WhoWeAreComponent, CategoriesComponent, FeaturesComponent, ShopComponent, BlogsComponent]
})
export class HomeComponent {

}
