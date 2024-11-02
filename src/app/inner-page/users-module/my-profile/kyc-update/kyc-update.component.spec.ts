import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KycUpdateComponent } from './kyc-update.component';

describe('KycUpdateComponent', () => {
  let component: KycUpdateComponent;
  let fixture: ComponentFixture<KycUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ KycUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KycUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
