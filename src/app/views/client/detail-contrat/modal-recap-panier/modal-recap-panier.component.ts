import { APP_SESSION_KEY } from './../../../../config/config';
import { PlatformService } from './../../../../../shared/services/platform.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonRow, IonCol, IonIcon, IonText, IonContent } from '@ionic/angular/standalone';
import { ItemImpayeComponent } from '../item-impaye/item-impaye.component';
import { PanierService } from './../../../../core/usercases/Panier.Service';
import { StoreService } from 'src/app/providers/store.service';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IntegrateurPaiementModal } from 'src/app/components/integrateur-paiement/integrateur-paiement.modal';
import { ContratClientService } from 'src/app/core/usercases/ContratClient.Service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SessionService } from 'src/app/providers/session.service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { IClientUniqueContrats, IContrat, IImpaye } from 'src/app/models/contrat.model';
import { KobusClientUniqueService } from 'src/app/core/usercases/KobusClientUnique.Service';
import { IResult } from 'src/app/models/model';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { IPaiementRespnse } from 'src/app/core/adaptors/PaymentIntegratorApiAdaptor';

@Component({
  selector: 'app-modal-recap-panier',
  templateUrl: './modal-recap-panier.component.html',
  styleUrls: ['./modal-recap-panier.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonRow,
    IonCol,
    IonIcon,
    IonText,
    IonContent,
    ItemImpayeComponent
  ]
})
export class ModalRecapPanierComponent implements OnInit {

  @Input() nuContrat: number;
  listPanier:IImpaye[] = [];
  totalAmount = 0;
  isEmptyList: boolean;
  actionChecked: any;
  devise: string;
  platformValue: string
  userInfo: any
  listQuittance: any[]=[]

  constructor(
    private router: Router,
    private store: StoreService,
    private panier: PanierService,
    private _session: SessionService,
    private platform: PlatformService,
    private modalCtrl: ModalController,
    private spinner: NgxSpinnerService,
    private panierService: PanierService,
    private contratService: ContratClientService,
    private _configSpinner: SpinnerConfigService,
    private _clientUniqueService: KobusClientUniqueService,
  ) {
    this.actionChecked = {
      action: 'AUTO',
      value: true
    };
    this.platformValue = this.platform.getPlatform()
  }

  ionViewWillEnter() {
    this.totalAmount = 0;
    this.listPanier.find(item => {
      this.totalAmount += item.montantQuittance;
    });
  }

  ngOnInit() {
    this.devise = this.store.storeValue(APP_STORAGE_KEY.FILIALE).devise;
    this.userInfo = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER);

    this.panierService.panierBehaviorSubject
      .subscribe(
        resp => {
          this.listPanier = resp;
          this.isEmptyList = this.listPanier.length > 0 ? false : true;
        }
      );
  }

  onCloseModal(){
    this.modalCtrl.dismiss();
  }

  executeChildAction($data){
    switch ($data.action) {
      case 'REMOVE':
        this.totalAmount -= $data.value.montantQuittance;
        $data.value.selected = false;
        this.panierService.removePrimeFromPanier({...$data.value});
        break;
      default:
        $data.value.selected = true;
        this.panierService.addPrimeFromPanier({...$data.value});
        break;
    }
  }

  openModal(){
    const detailUser = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER);
    const pay = {
      fullname: `${detailUser.nom} ${detailUser.prenom}`,
      amount: this.totalAmount,
      phoneNumber: detailUser.telephone
    };
    this.modalCtrl.dismiss()
      .then(
        resp => {
          this.openIntegratorModal(pay)
        }
      );
  }

  async openIntegratorModal(componentPropsData: any){
    const modal = await this.modalCtrl.create({
      id: 'pay_integrator_modal',
      component: IntegrateurPaiementModal,
      cssClass: 'pay_integrator_modal-style',
      componentProps: {
        payData: {mode: 'impaye', ...componentPropsData}
      }
    });
    modal.present();
    modal.onDidDismiss()
      .then(
        payResult => {
          if(payResult.role === 'success') {
            this._configSpinner.setMessage('Patientez, nous mettons à jours vos contrats')
            this.onSaveImpayeeOperation(payResult)
          }
        }
      )
      .catch(
        error => {
          console.log('panier pay operating :::> ', error)
          this.spinner.hide()
          AlertModal
            .show('Erreur Serveur',
            'Nous avons rencontré un problème lors du traitement de votre demande',
            alertIcon.error);
        }
      )
  }

  onSaveImpayeeOperation(respInJson){
    const payResult = respInJson.data as IPaiementRespnse
    const data = {
      ReferenceId: payResult.transactionId,
      CodeStatutTransaction: 'succes' ,
      refTransaction: payResult.transactionId,
      montant : this.totalAmount,
      numero: payResult.phoneNumber,
      Quittances: this.listPanier,
      numeroClient: this.userInfo.nuClient,
      CodeFiliale: this.userInfo.codeFiliale,
    };

    this.spinner.show()
    this.contratService.saveQuittenceAfterPay(data)
      .then(
        respSave => {
          if (respSave.Statut === 200){
            const authData = this._session.storeValue(APP_STORAGE_KEY.AUTH)
            this._clientUniqueService.getUniqueClientContrats(authData.clientNumber)
              .then(
                contratsData => {
                  const result = contratsData as IResult<IClientUniqueContrats>
                  const contrats = result.data;
                  this.panier.clean();
                  this._session.dispatch(APP_SESSION_KEY.PANIER, []);
                  this._session.dispatch(APP_SESSION_KEY.CURRENT_CONTRAT, []);
                  this._session.dispatch(APP_STORAGE_KEY.CONTRATS, contrats);
                  this.spinner.hide()
                    .then(
                      closed => {
                        AlertModal
                          .show('Reglement de quittance', 'Paiement effectué avec succès', alertIcon.success, true, 'Continuer' )
                          .then(result => {
                            this._session.dispatch(APP_STORAGE_KEY.CONTRATS, contrats);
                            this.router.navigate(['/contrats']);
                          });
                      }
                    );
                }
              );
          } else {
            this.spinner.hide()
            AlertModal
              .show('Erreur Serveur',
              'Nous avons rencontré un problème lors du traitement de votre demande',
              alertIcon.error);
          }
        }
      )
      .catch(error => {
        this.spinner.hide()
        AlertModal
          .show('Erreur Serveur',
          'Nous avons rencontré un problème lors du traitement de votre demande',
          alertIcon.error);
      });
  }

  buildQuittancesForQuery = (quittances: IImpaye[])=>{
    let currentValue = []
      for(const item of quittances)
        currentValue.push({
          NumeroPolice: item.numeroPolice,
          MontantEmis: item.montantQuittance,
          NumeroQuittance: item.numeroQuittance
        })
    return currentValue
  }
}
