import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogDetailsPageComponent } from './catalog-details-page.component';

describe('CatalogDetailsPageComponent', () => {
  let component: CatalogDetailsPageComponent;
  let fixture: ComponentFixture<CatalogDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CatalogDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatalogDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
