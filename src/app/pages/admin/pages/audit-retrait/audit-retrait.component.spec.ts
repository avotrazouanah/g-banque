import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditRetraitComponent } from './audit-retrait.component';

describe('AuditRetraitComponent', () => {
  let component: AuditRetraitComponent;
  let fixture: ComponentFixture<AuditRetraitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditRetraitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditRetraitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
