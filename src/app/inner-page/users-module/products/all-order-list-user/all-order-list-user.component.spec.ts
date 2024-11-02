import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrderListUserComponent } from './all-order-list-user.component';

describe('AllOrderListUserComponent', () => {
  let component: AllOrderListUserComponent;
  let fixture: ComponentFixture<AllOrderListUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ AllOrderListUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrderListUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
