import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicaiIndexComponent } from './licai-index.component';

describe('LicaiIndexComponent', () => {
  let component: LicaiIndexComponent;
  let fixture: ComponentFixture<LicaiIndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LicaiIndexComponent],
    });
    fixture = TestBed.createComponent(LicaiIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
