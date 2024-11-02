import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSingalComponent } from './blog-singal.component';

describe('BlogSingalComponent', () => {
  let component: BlogSingalComponent;
  let fixture: ComponentFixture<BlogSingalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BlogSingalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogSingalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
