import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentByClietComponent } from './payment-by-cliet.component';

describe('PaymentByClietComponent', () => {
  let component: PaymentByClietComponent;
  let fixture: ComponentFixture<PaymentByClietComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PaymentByClietComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentByClietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
