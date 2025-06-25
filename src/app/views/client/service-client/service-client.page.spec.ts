import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceClientPage } from './service-client.page';

describe('ServiceClientPage', () => {
  let component: ServiceClientPage;
  let fixture: ComponentFixture<ServiceClientPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
