import { ACT_ENUM } from './../../../../config/config';
import { IProposition } from 'src/app/core/entities/Propostion';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit, Output } from '@angular/core';
import { IntegrateurPaiementModal } from 'src/app/components/integrateur-paiement/integrateur-paiement.modal';
import { IPaiementRespnse } from 'src/app/core/adaptors/PaymentIntegratorApiAdaptor';

@Component({
  selector: 'app-detail-proposition',
  templateUrl: './detail-proposition.component.html',
  styleUrls: ['./detail-proposition.component.scss'],
  providers: [ModalController]
})
export class DetailPropositionComponent implements OnInit {
  @Input() proposition: any;
  @Input() codeFiliale: string
  @Input() validateFunct: Function
  currentProposition: IProposition

  constructor(
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.currentProposition = this.proposition.detailProposition
    console.log('detail proposition info :::> ', this.currentProposition)
  }

  closeModal(){
      this.modalCtrl.dismiss();
    }

  async openPayModalModule(){
    const propositionData = this.proposition
    const modal = await this.modalCtrl.create({
      id: 'pay_integrator_modal',
      component: IntegrateurPaiementModal,
      cssClass: 'pay-subscribe-modal-style',
      componentProps: {
        payData: {
          fullname: `${propositionData.nomClient} ${propositionData.prenomClient}`,
          amount: this.proposition.detailProposition.DetailSimulation.PremierePrime,
        }
      }
    });
    modal.present();
    modal.onDidDismiss()
      .then(
        payData => {
          const payResult = payData.data as IPaiementRespnse
          if(payData.role !== 'close') this.validateFunct(payResult, this.proposition)
          console.log('data modal :::> ', payResult)
        }
      )
  }
}
