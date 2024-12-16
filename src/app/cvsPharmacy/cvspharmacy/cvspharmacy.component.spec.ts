import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CVSPharmacyComponent } from './cvspharmacy.component';

describe('CVSPharmacyComponent', () => {
  let component: CVSPharmacyComponent;
  let fixture: ComponentFixture<CVSPharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CVSPharmacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CVSPharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
