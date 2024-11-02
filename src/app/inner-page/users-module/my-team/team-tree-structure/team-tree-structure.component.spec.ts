import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTreeStructureComponent } from './team-tree-structure.component';

describe('TeamTreeStructureComponent', () => {
  let component: TeamTreeStructureComponent;
  let fixture: ComponentFixture<TeamTreeStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ TeamTreeStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTreeStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
