import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from 'src/app/providers/session.service';
import { PlatformService } from 'src/shared/services/platform.service';
import { APP_SESSION_KEY } from './../../../../config/config';
import { ModalController, ToastController } from '@ionic/angular';
import { colors } from './../../../../config/color';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import {
  IonContent,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { NgxSpinnerService } from 'ngx-spinner';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { LabelType, Options } from '@angular-slider/ngx-slider';
import { IContrat } from 'src/app/models/contrat.model';
import { IClient } from 'src/app/models/client.model';
import { ISimulationDemandePrestation } from 'src/app/models/prestation.model';
import { SimulationDemandePrestationService } from 'src/app/core/usercases/SimulationDemandePrestation.Service';
import { StoreService } from 'src/app/providers/store.service';
import { DemandePrestationService } from 'src/app/core/usercases/DemandePrestation.Service';
@Component({
  selector: 'modal-prestation',
  templateUrl: './modal-prestation.component.html',
  styleUrls: ['./modal-prestation.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonRow,
    IonCol,
    IonText,
    IonIcon,
    IonList,
    IonItem,
    IonSelect,
    IonSelectOption,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    NgxSliderModule
  ]
})
export class ModalPrestationComponent implements OnInit, OnDestroy {

  @Input() prData: IContrat;

  currentUser: IClient
  iconColor: string
  formSimulate: FormGroup
  toggleDetail = false
  maxAmountValue = 0.0
  loadingSimulate = false
  savePrestationStatus = false
  simulateStatus: boolean
  isEligible:boolean
  simulateData: any
  modeToPay: any[]
  appConfig: any;
  typeDemande: string;
  devise: string;
  currentTransfertMoney = 0;
  currentModeSelected: any;
  currentContrat: any
  defaultPeriodicity: any
  detailPolice: any
  listEcheance: any[]
  listReglement: any[]

  listTypePrestation = [
    {
      typePrs: 'AVAN',
      label: 'AVANCE'
    },
    {
      typePrs: 'RP',
      label: 'RACHAT PARTIEL'
    }
  ];

  isInitInputSimulate: boolean
  listAgences = []
  phones:string[] = []
  platformValue: string
  optionSlideMontant: Options

  constructor(
    private router: Router,
    private store: StoreService,
    private session: SessionService,
    private platform: PlatformService,
    private toastCtl :ToastController,
    private modalCtrl: ModalController,
    private spinner: NgxSpinnerService,
    private apiService: DemandePrestationService,
    private simulationDmdePrestation: SimulationDemandePrestationService) {
    this.appConfig = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
    this.devise = this.store.storeValue(APP_STORAGE_KEY.FILIALE).devise;
    this.platformValue = this.platform.getPlatform()
  }

  ngOnDestroy(): void {
    this.simulateData = undefined
    this.simulateStatus = false
    this.isEligible = false
  }

  async presentToast() {
    const toast = await this.toastCtl.create({
      message: "Vous devez correctement renseigner tout les champs",
      position: 'bottom',
      color: 'red',
      duration: 5000,
      buttons: [
        {
          side: 'end',
          icon: 'close',
          handler: () => {}
        }
      ]
    });
    toast.present();
  }

  onInitInputSimulate(){
    this.simulate()
    this.isInitInputSimulate = false
  }

  ngOnInit() {
    this.iniForm();
    this.currentUser = this.session.storeValue('currentUser') as IClient
    this.iconColor = 'primary';
    this.simulateStatus = false;
    this.isInitInputSimulate = false
    this.modeToPay = this.appConfig.modePayList;
    this.listAgences = this.appConfig.agences

    this.prestationAmount.valueChanges
      .subscribe(
        event => {
          this.currentTransfertMoney = parseInt(event);
          this.simulateStatus = false
        }
      )

    this.echeanceNumber.valueChanges
      .subscribe(event =>  this.simulateStatus = false)

    this.payMode.valueChanges
      .subscribe(
        event =>  {
          const currentMode = this.searchModeReglement(event)
          this.currentModeSelected = `${currentMode.Libelle[0]}`.toUpperCase()
        }
    )

    this.detailPolice = this.prData.detailContrat
  }

  changePayMode(e) {
    this.payMode.setValue(e.value, {
      onlySelf: true
    });
  }

  changeTypePrestation(e) {
    const selected = e.detail.value;
    this.typeDemande = selected;
    this.onInitInputSimulate();
  }

  changePeriodicPay(e) {
    this.periodicity.setValue(e.target.value, {
      onlySelf: true
    });
  }

  changeTelephone(e) {
    this.telephone.setValue(e.target.value, {
      onlySelf: true
    });
  }

  searchModeReglement(modeId: string): any {
    return this.listReglement
      .filter( modeItem => modeItem.$id === modeId && modeItem )[0]
  }

  public get prestationAmount() { return this.formSimulate.get('prestationAmount'); }
  public get echeanceNumber() { return this.formSimulate.get('echeanceNumber'); }
  public get periodicity() { return this.formSimulate.get('periodicity'); }
  public get telephone() { return this.formSimulate.get('telephone'); }
  public get payMode() { return this.formSimulate.get('payMode'); }
  public get invalidForm() { return this.formSimulate.invalid; }

  iniForm = () => {
    this.formSimulate = new FormGroup({
      typeDemande: new FormControl('', [Validators.required]),
      payMode: new FormControl(undefined, [Validators.required]),
      prestationAmount: new FormControl(0, [Validators.required, Validators.maxLength(6)]),
      echeanceNumber: new FormControl(0, [Validators.required, Validators.maxLength(6)]),
      telephone: new FormControl("", [Validators.maxLength(12)]),
      agence: new FormControl("", [Validators.maxLength(25)]),
      periodicity: new FormControl("")
    });
  }

  closeModal = () => {
    this.modalCtrl.dismiss();
  }

  simulate = () => {
    this.loadingSimulate = true;
    const queryBody = {
      NumeroPolice: this.prData.detailContrat.numeroPolice ,
      ModeReglementId: this.formSimulate.value.payMode,
      Montant: this.formSimulate.value.prestationAmount,
      Duree: this.formSimulate.value.echeanceNumber || 0
    };
    console.log('queryBody',queryBody)
    this.simulationDmdePrestation.simulationDemandePrestation(this.typeDemande, queryBody)
      .then(
        simulateResponse => {
          this.loadingSimulate = false;
          this.simulateData = simulateResponse;
          this.isEligible = simulateResponse.data?.isEligible

          const msgSimulation: string = this.simulationDmdePrestation.simulateMessage;

          if (simulateResponse.status && simulateResponse.data.isEligible) {
            this.simulateStatus = this.currentTransfertMoney > 0 ? true : false
            this.isInitInputSimulate = true

            msgSimulation !== "" && this.errorModalPresent(msgSimulation)
            const simulationDemandePrestation = simulateResponse.data as ISimulationDemandePrestation;
            const simulateJsonFormat = simulationDemandePrestation

            const currentPeriodicity = simulateJsonFormat.periodicite ? this.getDefaultPeriodicite(simulateJsonFormat.periodicite) : ""
            this.phones = simulateJsonFormat.phones
            this.defaultPeriodicity = currentPeriodicity._id
            this.listEcheance = simulateJsonFormat.listEcheance
            this.listReglement = simulateJsonFormat.listReglement
            this.maxAmountValue = simulateJsonFormat.montantDeRachat;

            this.listReglement.length > 0 && this.payMode.setValue(this.listReglement[0].$id)
            this.optionSlideMontant = {
              floor: 0,
              step: 1000,
              ceil: this.maxAmountValue,
              translate: (value: number, label: LabelType): string => {
                switch (label) {
                  case LabelType.Low:
                    return `<p>Montant demandé </p>${value} ${this.devise}`;
                  default:
                    return `${value} ${this.devise}`;
                }
              }
            };
          } else if (msgSimulation.length > 0) {
            this.errorModalPresent(msgSimulation);
          } else { this.modalCtrl.dismiss(); }
        }
      );
  }

  sauvegardeDemandePrestation = () => {
    this.spinner.show()
    this.loadingSimulate = true;
    this.savePrestationStatus = false;
    const modeReglement = this.findModeReglement(this.payMode.value)

    const queryBody = {
      ModeReglement: modeReglement,
      // CodeProduit: this.prData._codeProduit,
      PeriodiciteAvanceId: this.defaultPeriodicity,
      Duree: this.formSimulate.value.echeanceNumber,
      NumeroPolice: this.prData.detailContrat.numeroPolice,
      ModeReglementId: this.formSimulate.value.payMode, //Mode test
      IdAgenceRecupVersement: this.formSimulate.value.agence,
      MontantDemande: this.formSimulate.value.prestationAmount,
      NumeroPhoneRecupVersement: this.formSimulate.value.telephone,
      DemandePrestationTypeIdentifiant: this.formSimulate.value.typeDemande,
    };

    this.controlInputValue(modeReglement)

    this.apiService.saveDemandePrestation(queryBody)
      .then(
        (resp: any) => {
          this.loadingSimulate = false;
          this.savePrestationStatus = resp.succes;
          this.spinner.hide()
          if (this.savePrestationStatus)
            AlertModal
              .show('', this.formatDemandePrestationMessage(this.currentModeSelected._identifiant, resp), alertIcon.success)
              .then(apiResp => {
                console.log('save demande :::> ', resp)
                this.session.dispatch(APP_SESSION_KEY.CURRENT_CONTRAT, [])
                this.modalCtrl.dismiss().then(result => this.router.navigate(['contrats']))
              })
          else
            AlertModal
              .show('', 'Nous avons rencontré un problème lors du traitement de votre demande', alertIcon.error)
        }
      )
      .catch(error =>
        AlertModal
          .show('', 'Nous avons rencontré un problème lors du traitement de votre demande', alertIcon.error)
      );
  }

  errorModalPresent(msg: string) {
    Swal.fire({
      icon: 'info',
      title: 'Demande de prestation',
      confirmButtonColor: colors.secondary,
      confirmButtonText: `Fermer`,
      text: msg,
    }).then( result => {this.simulateStatus = false});
  }

  getDefaultPeriodicite(codePeriodicity: string): any{
    return this.appConfig.periodicityList
      .filter( periodicity => periodicity._codePeriodicite === codePeriodicity && periodicity)[0]
  }

  findModeReglement(modeId: number): any {
    return this.listReglement.filter(itemMode => itemMode.$id === modeId)[0];
  }

  findAgence(agenceId: number): any {
    return this.appConfig.agences.filter(itemMode => itemMode.IdAgence === agenceId)[0];
  }

  formatDemandePrestationMessage(modeRgmtId: string, data: any): string {
    switch (modeRgmtId) {
      case 'M':
        return `
        Votre demande a bien été prise en compte, le règlement sera
        effectué le ${data.RdvDateStr} par mobile money sur votre numèro mobile
        N° ${this.formSimulate.value.telephone}. NSIA vie vous remercie pour votre fidélité.`
      case 'C':
        return `
        Votre demande a bien été prise en compte, le chèque sera disponible le ${data.RdvDateStr} à
        ${this.findAgence(this.formSimulate.value.agence).DistrictAgence}.`
      case 'B':
      default:
        return `
        Votre demande a bien été prise en compte, le règlement sera effectué le ${data.RdvDateStr}
        sur votre compte bancaire N°${this.simulateData._compteBancaire} . Si ce compte est clôturé, merci de vous rendre en agence
        avec l'attestation de clôture de compte ou nous joindre au ${this.appConfig.agences[0].TelephoneAgence}
        `
    }
  }

  controlInputValue(modeId: string){
    console.log('controlInputValue :::> ', modeId)
  }
}
