import { ModalController } from '@ionic/angular';
import { APP_STORAGE_KEY } from './../../config/config';
import { Component, Input, OnInit } from '@angular/core';
import { StoreService } from 'src/app/providers/store.service';
import { IIntegrateur } from './../../core/factory/IntegrateurFactory';
import { PaiementModalComponent } from '../paiement-modal/paiement-modal.component';
import { WebviewIntegratorComponent } from '../webview-integrator/webview-integrator.component';
import { WavePayService } from 'src/app/core/usercases/WavePay.Service';
//import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { WaveModalComponent } from '../paiement-modal/wave-modal/wave-modal.component';
import { CommonModule } from '@angular/common';
import { IonRow, IonCol, IonIcon, IonContent } from '@ionic/angular/standalone';
import { ItemIntegratorPayComponent } from './item-integrator-pay/item-integrator-pay.component'; // Adjust the path as needed

@Component({
  selector: 'app-integrateur-paiement-modal',
  templateUrl: './integrateur-paiement.modal.html',
  styleUrls: ['./integrateur-paiement.modal.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonRow,
    IonCol,
    IonIcon,
    IonContent,
    ItemIntegratorPayComponent
  ]
})
export class IntegrateurPaiementModal implements OnInit {
  @Input() payData: any;
  listIntegrateur: IIntegrateur[] = [];
  constructor(
    private store: StoreService,
    private modalCtrl: ModalController,
    private waveService: WavePayService
  ) {
    this.listIntegrateur = store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
      .integrators as IIntegrateur[];
  }

  ngOnInit() {

  }

  async openApiIntegratorModal(integrator: string) {
    const codeFiliale = this.store.storeValue(
      APP_STORAGE_KEY.FILIALE
    ).codeFiliale;
    const modal = await this.modalCtrl.create({
      id: 'pay_api_modal',
      component: PaiementModalComponent,
      cssClass: 'pay-subscribe-modal-style',
      componentProps: {
        payData: { codeFiliale: codeFiliale, ...this.payData },
        integrator: integrator,
      },
    });
    await modal.present();
  }

  async openWebviewIntegrator(webIntegrator: string) {
    const modal = await this.modalCtrl.create({
      id: 'pay_webview_modal',
      component: WebviewIntegratorComponent,
      cssClass: 'pay-subscribe-modal-style',
      componentProps: {
        payData: this.payData,
        integrator: webIntegrator,
      },
    });

    await modal.present();
  }

  async openWaveIntegrator() {
    const modal = await this.modalCtrl.create({
      id: 'wave_api_modal',
      component: WaveModalComponent,
      cssClass: 'pay-subscribe-modal-style',
      componentProps: {
        payData: this.payData ,
      },
    });
    await modal.present();
  }

  openPaymentModal(integratorSelected: IIntegrateur, payInfo) {
    switch (integratorSelected.libelle) {
      case 'IxpertaPay':
      case 'Hub2':
        this.openApiIntegratorModal(integratorSelected.libelle);
        break;
      case 'KKiaPay':
        this.openWebviewIntegrator(integratorSelected.libelle);
        break;
        case 'AfrikPay':
        this.openWebviewIntegrator(integratorSelected.libelle);
        break;
      case 'Wave':
        this.openWaveIntegrator();
        break;
    }
  }

  onCloseModal() {
    this.modalCtrl.dismiss('', 'close');
  }
}
