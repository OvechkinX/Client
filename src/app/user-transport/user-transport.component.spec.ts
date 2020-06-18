import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTransportComponent } from './user-transport.component';

describe('UserTransportComponent', () => {
  let component: UserTransportComponent;
  let fixture: ComponentFixture<UserTransportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserTransportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
