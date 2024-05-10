import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListpageComponent } from './friends-listpage.component';

describe('FriendsListpageComponent', () => {
  let component: FriendsListpageComponent;
  let fixture: ComponentFixture<FriendsListpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsListpageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendsListpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
