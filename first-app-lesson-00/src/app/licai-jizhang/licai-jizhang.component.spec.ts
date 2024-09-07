import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicaiJizhangComponent } from './licai-jizhang.component';

describe('LicaiJizhangComponent', () => {
  let component: LicaiJizhangComponent;
  let fixture: ComponentFixture<LicaiJizhangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicaiJizhangComponent],
    });
    fixture = TestBed.createComponent(LicaiJizhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
