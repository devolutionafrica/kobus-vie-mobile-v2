import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContratsPage } from './contrats.page';

describe('ContratsPage', () => {
  let component: ContratsPage;
  let fixture: ComponentFixture<ContratsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
