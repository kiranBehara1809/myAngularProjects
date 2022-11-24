import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbaComponent } from './snackba.component';

describe('SnackbaComponent', () => {
  let component: SnackbaComponent;
  let fixture: ComponentFixture<SnackbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnackbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
