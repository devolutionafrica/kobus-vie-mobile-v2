import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PropositionsPage } from './propositions.page';

describe('PropositionsPage', () => {
  let component: PropositionsPage;
  let fixture: ComponentFixture<PropositionsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PropositionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
