import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditOperationComponent } from './audit-operation.component';

describe('AuditOperationComponent', () => {
  let component: AuditOperationComponent;
  let fixture: ComponentFixture<AuditOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuditOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuditOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
