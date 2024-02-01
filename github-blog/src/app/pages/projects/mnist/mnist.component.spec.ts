import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MnistComponent } from './mnist.component';

describe('MnistComponent', () => {
  let component: MnistComponent;
  let fixture: ComponentFixture<MnistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MnistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MnistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
