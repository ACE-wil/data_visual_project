import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NeituiComponent } from './neitui.component';

describe('NeituiComponent', () => {
  let component: NeituiComponent;
  let fixture: ComponentFixture<NeituiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NeituiComponent],
    });
    fixture = TestBed.createComponent(NeituiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
