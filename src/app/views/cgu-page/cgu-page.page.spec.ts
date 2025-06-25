import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CguPagePage } from './cgu-page.page';

describe('CguPagePage', () => {
  let component: CguPagePage;
  let fixture: ComponentFixture<CguPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CguPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
