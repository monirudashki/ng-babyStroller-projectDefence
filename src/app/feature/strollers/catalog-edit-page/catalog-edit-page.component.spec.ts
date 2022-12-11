import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogEditPageComponent } from './catalog-edit-page.component';

describe('CatalogEditPageComponent', () => {
  let component: CatalogEditPageComponent;
  let fixture: ComponentFixture<CatalogEditPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogEditPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
