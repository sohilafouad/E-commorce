import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForggetpasswordComponent } from './forggetpassword.component';

describe('ForggetpasswordComponent', () => {
  let component: ForggetpasswordComponent;
  let fixture: ComponentFixture<ForggetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForggetpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ForggetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
