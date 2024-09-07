import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindHousesComponent } from './find-houses.component';

describe('FindHousesComponent', () => {
  let component: FindHousesComponent;
  let fixture: ComponentFixture<FindHousesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FindHousesComponent],
    });
    fixture = TestBed.createComponent(FindHousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
