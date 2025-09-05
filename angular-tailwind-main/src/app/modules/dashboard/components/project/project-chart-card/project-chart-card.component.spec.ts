import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectChartCardComponent } from './project-chart-card.component';

describe('ProjectChartCardComponent', () => {
  let component: ProjectChartCardComponent;
  let fixture: ComponentFixture<ProjectChartCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectChartCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectChartCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
