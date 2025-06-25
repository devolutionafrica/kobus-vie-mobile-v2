import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AfrikpayWebviewComponent } from './afrikpay-webview.component';

describe('AfrikpayWebviewComponent', () => {
  let component: AfrikpayWebviewComponent;
  let fixture: ComponentFixture<AfrikpayWebviewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AfrikpayWebviewComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AfrikpayWebviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
