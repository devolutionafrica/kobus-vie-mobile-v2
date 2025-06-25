import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserProfilPage } from './user-profil.page';

describe('UserProfilPage', () => {
  let component: UserProfilPage;
  let fixture: ComponentFixture<UserProfilPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfilPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
