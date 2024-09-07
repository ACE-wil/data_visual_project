import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuPiaoComponent } from './gu-piao.component';

describe('GuPiaoComponent', () => {
  let component: GuPiaoComponent;
  let fixture: ComponentFixture<GuPiaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuPiaoComponent],
    });
    fixture = TestBed.createComponent(GuPiaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
