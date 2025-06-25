
import { IProposition } from 'src/app/core/entities/Propostion';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

import { NgxSpinnerService } from 'ngx-spinner';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

import { PropositionService } from 'src/app/core/usercases/Proposition.Service';
import { AlertButtomText, alertIcon, QuestionAlertModal } from 'src/shared/tools/modal';
import { IntegrateurPaiementModal } from 'src/app/components/integrateur-paiement/integrateur-paiement.modal';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { StoreService } from 'src/app/providers/store.service';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { Router } from '@angular/router';
import { IPaiementRespnse } from 'src/app/core/adaptors/PaymentIntegratorApiAdaptor';
@Component({
  selector: 'app-document-subscribe-modal',
  templateUrl: './document-subscribe-modal.component.html',
  styleUrls: ['./document-subscribe-modal.component.scss'],
  providers: [
    Camera,
    FilePath,
    FileChooser,
    PropositionService
  ]
})

export class DocumentSubscribeModalComponent implements OnInit {
  cropperImage = '';
  photoIdentitePath = '';

  @Input() propositionData: IProposition;
  @Input() coutDossier: any;
  @Input() codeFiliale: any;
  @Input() handlerCotation: Function
  @Input() handlerProposition: Function

  stepFile = 0;
  isLaunched = false;
  documents = [];
  isFinish = false;

  constructor(
    private _route: Router,
    private camera: Camera,
    private _store: StoreService,
    private spinner: NgxSpinnerService,
    private _configSpinner: SpinnerConfigService,
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
    this.stepFile = 0
  }

  prevStep = () => { if(this.stepFile >= 1) this.stepFile-- }

  getFileInfo(filePath): any {
    const fileInfo = {
      path: filePath,
      ext: filePath.replace(/^.*\./, ''),
      filename: filePath.substring(filePath.lastIndexOf('/') + 1)
    };
    return fileInfo;
  }

  selectImage = async () => {
    const actionSheet = await this.actionSheetController.create({
      header: "Sélectionnez la source de l'image",
      buttons: [{
        text: "Charger depuis la bibliothèque",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: "Utiliser la caméra",
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Annuler',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  payFirstPrime(){
    this.modalCtrl.dismiss()
    this.openIntegratorModal()
  }

  openActionModal(){
    const actionBtn: AlertButtomText = {
      cancel: 'Plus tard',
      confirm: 'Payer maintenant'
    };
    QuestionAlertModal
      .show('', 'Voulez-vous payer votre première prime maintenant ?', alertIcon.question, actionBtn)
      .then(
        responseQuestion => {
          if (responseQuestion.isConfirmed) {
            this.payFirstPrime();
          } else {
            this.onSaveCotation();
          }
        }
      );
  }

  onSaveCotation(){
    this.spinner.show();
    this.propositionData.Paiement = {
      CompteDebit: "",
      DetailPayment: "" ,
      PaimentProvider: "",
      ModeReglement: "ESPECES",
      PaymentId: "",
      Montant: this.propositionData.DetailSimulation.premierePrime,
    }
    this._configSpinner.setMessage('Patientez, nous enregistrons votre cotation')
    this.handlerCotation(this.propositionData)
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      sourceType,
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options)
      .then(
        (imageData) => {
          this.photoIdentitePath = 'data:image/jpeg;base64,' + imageData;
          console.log('launch picture ', this.photoIdentitePath);
        }, (err) => {}
      );
  }

  async launchCamera() {
    this.pickImage(this.camera.PictureSourceType.CAMERA);
  }

  dismiss() {
    this.modalCtrl.dismiss({
      id: 'docx_subscribe_modal',
      dismissed: true
    });
  }

  toUploadFileModal(){
    this.stepFile = 0

    this.isLaunched = !this.isLaunched;
  }

  async openIntegratorModal(){
    const souscripteur = this.propositionData.Souscripteur
    // this.propositionData.PieceJoints = this.documents

    const modal = await this.modalCtrl.create({
      id: 'pay_integrator_modal',
      component: IntegrateurPaiementModal,
      cssClass: 'pay_integrator_modal-style',
      componentProps: {
        payData: {
          fullname: `${souscripteur.Nom} ${ souscripteur.Prenoms}`,
          amount: this.propositionData.DetailSimulation.PremierePrime,
          data: this.propositionData.Souscripteur
        }
      }
    });
    await modal.present();
    await modal.onDidDismiss()
      .then(
        payData => {
          console.log('RETURN',payData)
          if(payData.role === 'success') {
            const payResult = payData.data as IPaiementRespnse
            this._configSpinner.setMessage('Patientez, nous créons votre contrat')
            this.createContrat(payResult, this.propositionData)
          }
        }
      )
  }

  createContrat(payResponse: IPaiementRespnse, proposition: IProposition){
    proposition.Paiement = {
      ModeReglement: "ESPECES",
      PaymentId: payResponse.transactionId,
      CompteDebit: payResponse.phoneNumber,
      PaimentProvider: payResponse.phoneNumber,
      DetailPayment: JSON.stringify(payResponse.description),
      Montant: this.propositionData.DetailSimulation.PremierePrime,
    }
    this.handlerProposition(proposition)
  }


  searchFile(res: any): number|boolean {
    let indexResult: number = null
    this.documents.find(
      (itemFile, index) => {
        if(itemFile.fileId === res.fileId) indexResult = index
      }
    )
    return indexResult !== null ? indexResult : false

  }

  addFile(ressources: any){
    const resultSearch = this.searchFile(ressources)
    if(resultSearch === false) this.documents.push(ressources);
    else this.documents[resultSearch as number] = ressources
    this.stepFile++;
    this.cropperImage = '';
    this.photoIdentitePath = '';
    if (this.stepFile === 1) {
      this.isLaunched = false;
      // this.onSaveCotation();
      this.openActionModal();
    }
  }

  previousModalEvent = () => this.stepFile--

}
