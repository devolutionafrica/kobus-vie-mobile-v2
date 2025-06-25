import { Component, Input, OnInit } from '@angular/core';
import { Browser } from '@capacitor/browser';
import { ModalController } from '@ionic/angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { IPaiementRespnse } from 'src/app/core/adaptors/PaymentIntegratorApiAdaptor';
import { WavePayService } from 'src/app/core/usercases/WavePay.Service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { EXTRANET_SOUSCRIPTION_API } from 'src/app/repository/EXTRANET_SOUSCRIPTION_API';

import { IonAvatar, IonLabel,  IonImg} from '@ionic/angular/standalone';


@Component({
  selector: 'app-wave-modal',
  templateUrl: './wave-modal.component.html',
  styleUrls: ['./wave-modal.component.scss'],
  imports : [IonAvatar, IonLabel,  IonImg]
})
export class WaveModalComponent implements OnInit {
  ngOnInit() {
    this.openWaveIntegrator();
  }
  @Input() payData: any;
  constructor(
    private spinner: NgxSpinnerService,
    private _configSpinner: SpinnerConfigService,
    private waveService: WavePayService,
    private modalCtrl: ModalController,
    private souscriptionService:EXTRANET_SOUSCRIPTION_API
  ) {}

  async openWaveIntegrator() {
    this.spinner.show();
    this._configSpinner.setMessage('Veuillez patienter ...');
    let item = {
      apiKey:'wave_sn_prod_wjvC66eyitU1Azf7TyYfjmM5f9OAvjRDZ3hxH20VYhBWjwUaCpw5JPFVZGL5CMrT6EGGQW1W3F3i_fC8DiY0JQXfaiNKyoK_Zw',
      url: 'https://api.wave.com/v1/checkout/sessions',
      data: {
        amount: this.payData.amount,
        currency: 'XOF',
        error_url: 'https://testkobussn.groupensia.com/payment-failed',
        success_url: 'https://testkobussn.groupensia.com/payment-success',
      },
    };

    this.waveService.intentPay(item).then((res) => {
      this.spinner.hide();
      //this.iab.create(res.wave_launch_url, '_self');
      Browser.open({ url: res.wave_launch_url, windowName: '_self' });
      this.checkWaveTransactionStatus(res.id);
      console.log('Wave response', res);
    });
    // payData: this.payData,
  }

  async checkWaveTransactionStatus(sessionId: string) {
    this.spinner.show();
    this._configSpinner.setMessage('Veuillez patienter ...');
    let intervalId: any;

    const checkStatus = async () => {
      let item = {
        apiKey:
          'wave_sn_prod_wjvC66eyitU1Azf7TyYfjmM5f9OAvjRDZ3hxH20VYhBWjwUaCpw5JPFVZGL5CMrT6EGGQW1W3F3i_fC8DiY0JQXfaiNKyoK_Zw',
        url: `https://api.wave.com/v1/checkout/sessions/${sessionId}`,
      };

      try {
        let response = await this.waveService.verifyPaymentStatus(item);
        console.log('Wave status', response.payment_status);
        // Vérifiez le statut et arrêtez l'intervalle si ce n'est pas "pending"
        if (response.payment_status !== 'processing' || response.last_payment_error !== null) {
          console.log('Wave', response);

          if (response.payment_status === 'cancelled' || response.last_payment_error !== null) {
            const paymentResponse: IPaiementRespnse = {
              "description": 'wave paiement',
              "transactionId": response.id,
              "dateCreated": response.when_created,
              "amount": response.amount,
              "paye": false,
              "phoneNumber": ""
            }
            let data = {
              "SessionId": response.id,
              "Operateur": "WAVE",
              "Montant": response.amount,
              "StatutPaiement": response.payment_status,
              "Devise": response.currency
            }
            this.souscriptionService.saveTransaction(data)
            this.modalCtrl.dismiss({},'success','wave_api_modal');
            this.modalCtrl.dismiss(paymentResponse,'success','pay_integrator_modal');
            AlertModal.show(
              'Echec de paiement',
              response.last_payment_error.message,
              alertIcon.error,
              false
            );
          } else if (response.payment_status === 'succeeded') {
            const paymentResponse: IPaiementRespnse = {
              "description": 'wave paiement',
              "transactionId": response.id,
              "dateCreated": response.when_created,
              "amount": response.amount,
              "paye": true,
              "phoneNumber": ""
            }
            this.modalCtrl.dismiss({},'success','wave_api_modal');
            this.modalCtrl.dismiss(paymentResponse,'success','pay_integrator_modal');
          }
          this.spinner.hide();
          clearInterval(intervalId);
        }
      } catch (error) {
        this.spinner.hide();
        console.error('Erreur lors de la vérification du statut', error);
        // Vous pouvez également arrêter l'intervalle en cas d'erreur si souhaité
        clearInterval(intervalId);
      }
    };

    // Exécuter d'abord la vérification immédiatement
    await checkStatus();

    // Créer un intervalle pour vérifier toutes les 5 secondes
    intervalId = setInterval(checkStatus, 5000);
  }
}
