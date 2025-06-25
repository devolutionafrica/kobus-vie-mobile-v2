import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailContratPage } from './detail-contrat.page';

describe('DetailContratPage', () => {
  let component: DetailContratPage;
  let fixture: ComponentFixture<DetailContratPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailContratPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
