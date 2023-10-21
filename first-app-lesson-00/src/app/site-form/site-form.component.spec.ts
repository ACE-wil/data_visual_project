import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFormComponent } from './site-form.component';

describe('SiteFormComponent', () => {
  let component: SiteFormComponent;
  let fixture: ComponentFixture<SiteFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteFormComponent]
    });
    fixture = TestBed.createComponent(SiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
