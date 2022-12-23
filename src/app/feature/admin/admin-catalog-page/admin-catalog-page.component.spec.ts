import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCatalogPageComponent } from './admin-catalog-page.component';

describe('AdminCatalogPageComponent', () => {
  let component: AdminCatalogPageComponent;
  let fixture: ComponentFixture<AdminCatalogPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCatalogPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCatalogPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
