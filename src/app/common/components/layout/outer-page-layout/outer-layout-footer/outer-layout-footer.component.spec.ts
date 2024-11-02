import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OuterLayoutFooterComponent } from './outer-layout-footer.component';

describe('OuterLayoutFooterComponent', () => {
  let component: OuterLayoutFooterComponent;
  let fixture: ComponentFixture<OuterLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ OuterLayoutFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OuterLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
