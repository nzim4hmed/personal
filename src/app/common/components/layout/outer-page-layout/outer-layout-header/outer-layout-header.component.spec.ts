import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterLayoutHeaderComponent } from './outer-layout-header.component';

describe('OuterLayoutHeaderComponent', () => {
  let component: OuterLayoutHeaderComponent;
  let fixture: ComponentFixture<OuterLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OuterLayoutHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
