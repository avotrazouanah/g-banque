import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCompteComponent } from './audit-compte.component';

describe('AuditCompteComponent', () => {
  let component: AuditCompteComponent;
  let fixture: ComponentFixture<AuditCompteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditCompteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
