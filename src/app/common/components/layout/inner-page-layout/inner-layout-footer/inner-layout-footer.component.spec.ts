import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLayoutFooterComponent } from './inner-layout-footer.component';

describe('InnerLayoutFooterComponent', () => {
  let component: InnerLayoutFooterComponent;
  let fixture: ComponentFixture<InnerLayoutFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InnerLayoutFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerLayoutFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
