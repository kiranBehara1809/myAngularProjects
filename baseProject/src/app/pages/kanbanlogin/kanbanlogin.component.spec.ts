import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanloginComponent } from './kanbanlogin.component';

describe('KanbanloginComponent', () => {
  let component: KanbanloginComponent;
  let fixture: ComponentFixture<KanbanloginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanloginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
