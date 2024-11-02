import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTimeline1Component } from './activity-timeline1.component';

describe('ActivityTimeline1Component', () => {
  let component: ActivityTimeline1Component;
  let fixture: ComponentFixture<ActivityTimeline1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ ActivityTimeline1Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivityTimeline1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
