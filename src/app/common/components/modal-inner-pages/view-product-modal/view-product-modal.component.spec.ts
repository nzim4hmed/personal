import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProductModalComponent } from './view-product-modal.component';

describe('ViewProductModalComponent', () => {
  let component: ViewProductModalComponent;
  let fixture: ComponentFixture<ViewProductModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ViewProductModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewProductModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
