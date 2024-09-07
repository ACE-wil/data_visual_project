import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicaiTouziComponent } from './licai-touzi.component';

describe('LicaiTouziComponent', () => {
  let component: LicaiTouziComponent;
  let fixture: ComponentFixture<LicaiTouziComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicaiTouziComponent],
    });
    fixture = TestBed.createComponent(LicaiTouziComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
