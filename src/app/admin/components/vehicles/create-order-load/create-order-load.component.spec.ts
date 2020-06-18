import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderLoadComponent } from './create-order-load.component';

describe('CreateOrderLoadComponent', () => {
  let component: CreateOrderLoadComponent;
  let fixture: ComponentFixture<CreateOrderLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrderLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrderLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
