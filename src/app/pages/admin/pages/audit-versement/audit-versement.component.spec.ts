import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditVersementComponent } from './audit-versement.component';

describe('AuditVersementComponent', () => {
  let component: AuditVersementComponent;
  let fixture: ComponentFixture<AuditVersementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditVersementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
