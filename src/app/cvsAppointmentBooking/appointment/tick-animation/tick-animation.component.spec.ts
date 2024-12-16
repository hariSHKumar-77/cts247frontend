import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TickAnimationComponent } from './tick-animation.component';

describe('TickAnimationComponent', () => {
  let component: TickAnimationComponent;
  let fixture: ComponentFixture<TickAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TickAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TickAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
