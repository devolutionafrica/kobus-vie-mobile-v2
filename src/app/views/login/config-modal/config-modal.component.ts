import { alertIcon, QuestionAlertModal } from './../../../../shared/tools/modal';
import { IFilialeJsonFormat } from './../../../core/entities/Filiale';
import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { FilialeIcon } from 'src/app/config/filialeFlag';
import { IFiliale } from 'src/app/core/entities/Filiale';
import { FilialeSelectedService } from 'src/app/core/usercases/FilialeSelected.Service';
import { OperateurMobileService } from 'src/app/core/usercases/OperatorList.Service';
import { StoreService } from 'src/app/providers/store.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IntegrateurService } from 'src/app/core/usercases/Integrateur.Service';
import { IIntegrateur } from 'src/app/core/factory/IntegrateurFactory';
import { AlertModal } from 'src/shared/tools/modal';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { NgFor } from '@angular/common';
import { IonToolbar, IonIcon, IonContent,IonList,IonItem, IonImg, IonRadioGroup, IonRadio, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-config-modal',
  templateUrl: './config-modal.component.html',
  styleUrls: ['./config-modal.component.scss'],
  imports:[NgFor,IonToolbar, IonIcon, IonContent,IonList,IonItem, IonImg, IonRadioGroup, IonRadio, IonLabel]
})
export class ConfigModalComponent  implements OnInit {

  filialeList: IFiliale[] = [];
  filialeSelected: IFiliale;
  errorDetected: boolean = false

  constructor(
    private store: StoreService,
    private toastCtl: ToastController,
    private spinner: NgxSpinnerService,
    private _configSpinner: SpinnerConfigService,
    private integratorService: IntegrateurService,
    private operatorMobilService: OperateurMobileService,
    private filialeService: FilialeSelectedService,
    public modalCtrl: ModalController,
  ) {}

  ngOnInit(): void {
    this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).filiales
      .find(
        (item: IFilialeJsonFormat) => {
        const filialeItem = {
          filiale: item.libelle,
          fileDirPath: item.documentUrl,
          hostname: item.apiUrl,
          icon: FilialeIcon[item.codeFiliale],
          codeFiliale: item.codeFilialePaiement,
          devise: item.devise,
          souscriptionUrl: item.souscriptionUrl,
          ixpertaPayHostname: item.ixpertaPayHostname ,
          ixpertaPayApiKey: item.ixpertaPayApiKey
        };
        this.filialeList.push(filialeItem);
      });
    }


  selectFiliale = (value: IFiliale) => {
    QuestionAlertModal.show("",
      "En changeant de pays vous risquez de perdre toutes les données enregistrées sur votre téléphone. Voulez-vous vraiment appliquer cette modification ?"
      , alertIcon.question, {cancel: "Annuler", confirm: "Continuer"})
      .then( 
        response => {
          console.log(value)
          
          if(response.role === 'confirm') {
            this._configSpinner.setMessage('Configuration de votre environnement')
            this.spinner.show();
            this.filialeSelected = value;
            this.filialeService.setFiliale(value);
            this.integratorService.getIntegrateurs()
                    .then(
                      integrators => {
                        this.errorDetected = false
                        const appConfig = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
                        appConfig.operators = [];
                        const newAppConfig = {
                          ...appConfig,
                          integrators: integrators as IIntegrateur[]
                        };
                        this.store.dispatch(APP_STORAGE_KEY.DEFAULT_APPORTEUR, null)
                        this.store.dispatch(APP_STORAGE_KEY.APP_CONFIG, newAppConfig);
                        this.spinner.hide();
                        this.dismiss()
                      }
                    )
                    .catch( error => {
                      this.spinner.hide();
                      AlertModal
                        .show(
                          "",
                          `Nous avons rencontré un problème lors
                           de la récupération de certaines données`, alertIcon.info)
                      }
                    )
          } else this.dismiss()
        }
      )
  }

  dismiss() {
    this.modalCtrl.dismiss({
      id: 'config_modal',
      dismissed: true
    });
  }
}
