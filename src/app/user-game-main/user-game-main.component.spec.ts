import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserGameMainComponent } from './user-game-main.component';

describe('UserGameMainComponent', () => {
  let component: UserGameMainComponent;
  let fixture: ComponentFixture<UserGameMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserGameMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserGameMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
