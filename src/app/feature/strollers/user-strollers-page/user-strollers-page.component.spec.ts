import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserStrollersPageComponent } from './user-strollers-page.component';

describe('UserStrollersPageComponent', () => {
  let component: UserStrollersPageComponent;
  let fixture: ComponentFixture<UserStrollersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserStrollersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserStrollersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
