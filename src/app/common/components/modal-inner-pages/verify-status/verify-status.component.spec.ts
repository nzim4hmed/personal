import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyStatusComponent } from './verify-status.component';

describe('VerifyStatusComponent', () => {
  let component: VerifyStatusComponent;
  let fixture: ComponentFixture<VerifyStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ VerifyStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
