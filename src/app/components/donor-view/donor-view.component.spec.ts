import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorViewComponent } from './donor-view.component';

describe('DonorViewComponent', () => {
  let component: DonorViewComponent;
  let fixture: ComponentFixture<DonorViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DonorViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
