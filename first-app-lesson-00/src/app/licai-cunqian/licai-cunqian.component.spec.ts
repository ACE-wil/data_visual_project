import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicaiCunqianComponent } from './licai-cunqian.component';

describe('LicaiCunqianComponent', () => {
  let component: LicaiCunqianComponent;
  let fixture: ComponentFixture<LicaiCunqianComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicaiCunqianComponent],
    });
    fixture = TestBed.createComponent(LicaiCunqianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
