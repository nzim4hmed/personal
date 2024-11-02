import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderListStatusComponent } from './all-order-list-status.component';

describe('AllOrderListStatusComponent', () => {
  let component: AllOrderListStatusComponent;
  let fixture: ComponentFixture<AllOrderListStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AllOrderListStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrderListStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
