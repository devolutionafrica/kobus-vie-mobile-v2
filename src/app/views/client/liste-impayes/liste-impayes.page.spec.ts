import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListeImpayesPage } from './liste-impayes.page';

describe('ListeImpayesPage', () => {
  let component: ListeImpayesPage;
  let fixture: ComponentFixture<ListeImpayesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeImpayesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
