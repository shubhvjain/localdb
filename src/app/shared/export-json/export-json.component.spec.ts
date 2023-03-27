import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportJsonComponent } from './export-json.component';

describe('ExportJsonComponent', () => {
  let component: ExportJsonComponent;
  let fixture: ComponentFixture<ExportJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportJsonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
