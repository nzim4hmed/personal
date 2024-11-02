import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerLayoutHeaderComponent } from './inner-layout-header.component';

describe('InnerLayoutHeaderComponent', () => {
  let component: InnerLayoutHeaderComponent;
  let fixture: ComponentFixture<InnerLayoutHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ InnerLayoutHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InnerLayoutHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
