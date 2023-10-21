import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchartsChartComponent } from './echarts-chart.component';

describe('EchartsChartComponent', () => {
  let component: EchartsChartComponent;
  let fixture: ComponentFixture<EchartsChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EchartsChartComponent]
    });
    fixture = TestBed.createComponent(EchartsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
