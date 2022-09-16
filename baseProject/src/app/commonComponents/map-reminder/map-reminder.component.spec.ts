import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapReminderComponent } from './map-reminder.component';

describe('MapReminderComponent', () => {
  let component: MapReminderComponent;
  let fixture: ComponentFixture<MapReminderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapReminderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
