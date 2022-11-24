import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemindersListingComponent } from './reminders-listing.component';

describe('RemindersListingComponent', () => {
  let component: RemindersListingComponent;
  let fixture: ComponentFixture<RemindersListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemindersListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemindersListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
