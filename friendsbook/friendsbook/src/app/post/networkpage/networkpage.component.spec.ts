import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkpageComponent } from './networkpage.component';

describe('NetworkpageComponent', () => {
  let component: NetworkpageComponent;
  let fixture: ComponentFixture<NetworkpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
