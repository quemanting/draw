import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnsuringComponent } from './ensuring.component';

describe('EnsuringComponent', () => {
  let component: EnsuringComponent;
  let fixture: ComponentFixture<EnsuringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnsuringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnsuringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
