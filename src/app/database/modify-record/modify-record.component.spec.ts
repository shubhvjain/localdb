import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyRecordComponent } from './modify-record.component';

describe('ModifyRecordComponent', () => {
  let component: ModifyRecordComponent;
  let fixture: ComponentFixture<ModifyRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyRecordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModifyRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
