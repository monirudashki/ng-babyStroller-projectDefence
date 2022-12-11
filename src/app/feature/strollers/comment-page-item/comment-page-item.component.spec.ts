import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentPageItemComponent } from './comment-page-item.component';

describe('CommentPageItemComponent', () => {
  let component: CommentPageItemComponent;
  let fixture: ComponentFixture<CommentPageItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentPageItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentPageItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
