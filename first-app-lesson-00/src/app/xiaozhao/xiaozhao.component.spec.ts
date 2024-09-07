import { ComponentFixture, TestBed } from '@angular/core/testing';

import { XiaozhaoComponent } from './xiaozhao.component';

describe('XiaozhaoComponent', () => {
  let component: XiaozhaoComponent;
  let fixture: ComponentFixture<XiaozhaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [XiaozhaoComponent],
    });
    fixture = TestBed.createComponent(XiaozhaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
