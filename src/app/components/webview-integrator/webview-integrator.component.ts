import { Component, Input, OnInit } from '@angular/core';
//import { KkaipayWebviewComponent } from './kkaipay-webview/kkaipay-webview.component';
import { AfrikpayWebviewComponent } from './afrikpay-webview/afrikpay-webview.component';
import { ReactiveFormsModule } from '@angular/forms';
import {NgSwitch,NgSwitchCase} from '@angular/common'
import {IonContent} from '@ionic/angular/standalone'

@Component({
  imports:[IonContent,NgSwitch,NgSwitchCase,ReactiveFormsModule, AfrikpayWebviewComponent,],
  selector: 'webview-integrator',
  template: `
  <ion-content fullscreen='true'>
    <div [ngSwitch]="integrator">
      
      <div *ngSwitchCase="'AfrikPay'">
        <app-afrikpay-webview [webviewData]='payData'></app-afrikpay-webview>
      </div>
    </div>
  </ion-content>
  `,
  styleUrls: ['./webview-integrator.component.scss'],
})

export class WebviewIntegratorComponent implements OnInit {

  @Input() payData: any;
  @Input() integrator: string;
  constructor(){}
  ngOnInit() {}

}
