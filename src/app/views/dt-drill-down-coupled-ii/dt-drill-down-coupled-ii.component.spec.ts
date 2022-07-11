import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DtDrillDownCoupledIiComponent } from './dt-drill-down-coupled-ii.component';

describe('DtDrillDownCoupledIiComponent', () => {
  let component: DtDrillDownCoupledIiComponent;
  let fixture: ComponentFixture<DtDrillDownCoupledIiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DtDrillDownCoupledIiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DtDrillDownCoupledIiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
