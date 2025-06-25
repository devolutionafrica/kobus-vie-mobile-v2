import { Component, Input, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {DecimalPipe,NgIf,NgFor, NgSwitch,NgSwitchCase,NgSwitchDefault  } from '@angular/common';
import {MobilMoneyFormComponent} from './mobil-money-form/mobil-money-form.component';
import {PayModeComponent} from './pay-mode/pay-mode.component'
import { StoreService } from 'src/app/providers/store.service';
import {ModalController, IonContent, IonRow, IonCol,IonIcon,IonText} from '@ionic/angular/standalone'
@Component({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  selector: 'paiement-modal',
  templateUrl: './paiement-modal.component.html',
  styleUrls: ['./paiement-modal.component.scss'],
  imports:[PayModeComponent,DecimalPipe,MobilMoneyFormComponent,IonContent,IonRow, IonCol,IonIcon,IonText,NgIf,NgFor, NgSwitch,NgSwitchCase,NgSwitchDefault  ]
})

export class PaiementModalComponent implements OnInit {

  @Input() integrator: any;
  @Input() payData: any;
  formSelected: string;
  previousUrl: string;
  listModePay: any;
  devise: string;
  urlArg: string;
  //@ViewChild('slider', { static: false }) slider: IonSlides;

  constructor(
    private modalCtrl: ModalController,
    private store: StoreService) {
    this.listModePay = this.store.storeValue('appConfig').operators;
  }

  ngOnDestroy() {
      this.listModePay = []
  }

  ngOnInit(): void {
    this.devise = this.store.storeValue('filiale').devise;
    this.payData = {
      ...this.payData,
      operatorSelected: this.listModePay[0]
    };
  }

  dismissModal() {
    this.modalCtrl.dismiss({
      id: 'pay_subscribe_modal',
      dismissed: true
    });
  }

  ionViewWillEnter(){
    if (this.listModePay.length > 0) {
      this.formSelected = this.getOperatorAlias(this.listModePay[0]);
    }
  }

  selectedForm(evt){
    this.formSelected = this.getOperatorAlias(evt);
    if (this.payData.operatorSelected) {
      this.payData.operatorSelected = evt;
    } else {
      this.payData = {
      ...this.payData,
      operatorSelected: evt};
    }
  }

  getOperatorAlias(operator: any): string{
    const index = operator._codeOperateur.indexOf(operator._codePays);
    if (index !== -1) {
      const codeOp = operator._codeOperateur;
      return codeOp.substr(0, codeOp.length - 2);
    } else { return operator._codeOperateur; }
  }

  onSlideChanged($event){
    /*this.slider.getActiveIndex()
      .then(
        resp => {
          console.log('resp :::> ', resp);
        }
      );*/
  }

}
