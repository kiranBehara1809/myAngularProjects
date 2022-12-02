import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapDialogHeaderComponent } from './map-dialog-header.component';

describe('MapDialogHeaderComponent', () => {
  let component: MapDialogHeaderComponent;
  let fixture: ComponentFixture<MapDialogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapDialogHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapDialogHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
