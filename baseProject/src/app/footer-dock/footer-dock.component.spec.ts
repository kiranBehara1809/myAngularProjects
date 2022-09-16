import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterDockComponent } from './footer-dock.component';

describe('FooterDockComponent', () => {
  let component: FooterDockComponent;
  let fixture: ComponentFixture<FooterDockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterDockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterDockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
