import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDetailsPageComponent } from './search-details-page.component';

describe('SearchDetailsPageComponent', () => {
  let component: SearchDetailsPageComponent;
  let fixture: ComponentFixture<SearchDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
