import { Component, Input, OnInit } from '@angular/core';
import { NgIf, DecimalPipe } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { IonItem, IonRow, IonCol, IonIcon, IonInput } from '@ionic/angular/standalone';
import { LottieComponent } from 'ngx-lottie';

import { ModalController } from '@ionic/angular/standalone'
import { AnimationOptions } from 'ngx-lottie'
import { NgxSpinnerService } from 'ngx-spinner';
import { StoreService } from 'src/app/providers/store.service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { IxpertaPayService } from 'src/app/core/usercases/IxpertaPay.Service';
import { Tools } from 'src/shared/tools/utils';
import { Hub2PayForm, IxpertaPayForm } from 'src/forms/forms';
import { SessionService } from 'src/app/providers/session.service';
import { Hub2ModalComponent } from '../hub2-modal/hub2-modal.component';
import { Hub2PayService } from 'src/app/core/usercases/Hub2Pay.Service';
import { IHub2InitPayQueryBody } from 'src/app/core/factory/Hub2PayFactory';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { STEEP_TIME, MAX_CHECkED_TRANSACTION, APP_STORAGE_KEY } from './../../../config/config';
import { IHub2PayProcessQueryBody, IHub2PayProcessResponse } from 'src/app/core/factory/Hub2PayProcessFactory';
import { IPaiementRespnse } from 'src/app/core/adaptors/PaymentIntegratorApiAdaptor';

@Component({
  selector: 'app-mobil-money-form',
  templateUrl: './mobil-money-form.component.html',
  styleUrls: ['./mobil-money-form.component.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    NgIf,
    ReactiveFormsModule,
    MatSortModule,
    MatButtonModule,
    IonItem,
    IonRow,
    IonCol,
    IonIcon,
    IonInput,
    LottieComponent
  ]
})
export class MobilMoneyFormComponent implements OnInit {

  @Input() payData: any;
  @Input() integrator: any;
  operatorSelected: any;
  payForm: FormGroup;
  listQuittence = [];
  cashData: any;
  apiUrl: string;
  devise: string;
  userProfil: any;
  isAuth = false;
  isLunched: boolean = false
  payStatut: boolean = false
  loadingAnimationOptions : AnimationOptions = {
    path: '../../../assets/lotties/lot_loading.json',
    loop:  true,
    autoplay : true
  };
  validateAnimationOptions : AnimationOptions = {
    path: '../../../assets/lotties/lot_validate.json',
    loop:  true,
    autoplay : true
  };

  constructor(
    private store: StoreService,
    private _session: SessionService,
    private spinner: NgxSpinnerService,
    private modalCtrl: ModalController,
    private _hub2PayService: Hub2PayService,
    private configSpinner: SpinnerConfigService,
    private _ixpertaPayService: IxpertaPayService) {
      this.devise = store.storeValue('filiale').devise;
      this.userProfil = this._session.storeValue(APP_STORAGE_KEY.CURRENT_USER);
  }

  public get phoneNumber() { return this.payForm.get('phoneNumber'); }

  ngOnInit(){
    this.cashData = this.payData;
    this.operatorSelected = this.payData.operatorSelected;
    this.isAuth = this.store.storeValue('auth') !== undefined ? true : false ;
    this.payForm = this.getForm()
  }

  getForm(): FormGroup {
    switch (this.integrator) {
      case 'Hub2':
        return new Hub2PayForm(
          this.isAuth ? this.userProfil.telephone : this.payData.phoneNumber).buildForm()
      case 'IxpertaPay':
        return new IxpertaPayForm(
          this.isAuth ? this.userProfil.telephone : this.payData.phoneNumber).buildForm(this.operatorSelected._needOTP)
    }
  }

  async onPayOperation(){
    this.isLunched = true
    console.log('integrateur :::> ', this.integrator)
    switch (this.integrator) {
      case 'Hub2':
        this.payByHub2Integrator()
        break;
      case 'IxpertaPay':
      default:
        this.payByIxpertaIntegrator()
        break;
    }
  }

  generateOperatorLabel(operator: string): string {
    if (operator.indexOf(' ') !== -1) return operator.substr(0, operator.indexOf(' '));
    else return operator;
  }

  payByIxpertaIntegrator(){
    const payData = {
      "devise": this.devise,
      "montant":  this.cashData.amount ,
      "reftransaction": Tools.generatePayRef(),
      "numero": this.payForm.value.phoneNumber,
      "OTPCode": this.operatorSelected._needOTP ? this.payForm.value.codeOTP : "" ,
      "CodeFiliale": this.cashData.codeFiliale,
      "CodeOperateur": this.operatorSelected._codeOperateur
    }

    this._ixpertaPayService.intentPay(payData)
      .then(
        payResponse => {
          if(payResponse.codeStatutTransaction !== 200 && payResponse.statutTransaction !== 'Init')
            AlertModal.show("Echec de paiement", payResponse.message, alertIcon.error)
              .then(data => this.isLunched = false)
          else {
            const checkQueryBody = {
              "Reftransaction": payResponse.refId,
              "numero": payData.numero,
              "Filliale": payData.CodeFiliale
            }
            this.configSpinner.setMessage(payResponse.message)
            this.spinner.show()
            this.onCheckTransactionByIxpertaIntegrator(checkQueryBody)
          }
        }
      )
      .catch(
        error => {
          this.spinner.hide()
          AlertModal.show("Echec de paiement", "", alertIcon.error)
            .then(data => this.isLunched = false)
          console.log('error pay :::> ', error)
        }
      )
  }

  onCheckTransactionByIxpertaIntegrator(queryBody: any){
    let delay: number = 0
    const maxTime: number = MAX_CHECkED_TRANSACTION
    let isChecked: boolean = false
    let checkedResponse: any
    const doCheckedTransaction = () =>{
      this._ixpertaPayService.verifyPaymentStatus(queryBody)
        .then(response => checkedResponse = response)
        .finally(async ()=> {
          delay++
          await Tools.sleep(STEEP_TIME)
          if(delay === maxTime){
            isChecked = true
            this.spinner.hide()
            this.isLunched = false
            AlertModal.show("Echec de paiement", "", alertIcon.error)
          }

          if(checkedResponse?.CodeStatutTransaction === 'SUC'){
            isChecked = true
            this.isLunched = false
            this.payStatut = true
            const paymentResponse: IPaiementRespnse = {
              "description": checkedResponse.operateur,
              "transactionId": checkedResponse.reftransaction,
              "dateCreated": new Date().toString(),
              "amount": checkedResponse.montant,
              "paye": true,
              "phoneNumber": ""
            }
            this.spinner.hide()
            this.modalCtrl.dismiss(paymentResponse, 'success', 'pay_integrator_modal')
              .then(resp => this.modalCtrl.dismiss())
          }

          !isChecked && doCheckedTransaction()
        })
    }
    doCheckedTransaction()
  }

  onCheckTransactionByHub2Integrator = (queryBody: IHub2PayProcessQueryBody)=>{
    return this._hub2PayService.verifyPaymentStatus(queryBody)
      .then(value => value as IHub2PayProcessResponse)
  }

  payByHub2Integrator(){
    const parms: IHub2InitPayQueryBody = {
      Amount: this.cashData.amount,
      Operateur: this.operatorSelected._operateur,
      CustomerReference: "00000001",
      // CustomerReference: this.payForm.value.phoneNumber,
      DescriptionPayment: ""
    }

    this._hub2PayService.intentPay(parms)
      .then(
        result => {
          console.log('hub2 response :::> ', result)
          this.modalHub2ConfirmModal(result)
        }
      )
  }

  ionViewDidLeave(){
    this.spinner.hide();
  }

  async modalHub2ConfirmModal(value: any){
    const modal = await this.modalCtrl.create({
      component: Hub2ModalComponent,
      cssClass: 'hub2-modal-style',
      id: 'modal_hub2_confirm',
      componentProps: {
        data: value,
        callback: this.onCheckTransactionByHub2Integrator
      }
    })

    await modal.present()
    modal.onDidDismiss()
      .then((result:any) => {
        console.log('pay data :::> ', result)
        const paymentResponse: IPaiementRespnse = {
          "description": result.data,
          "transactionId": result.data.paymentId,
          "dateCreated": result.data.dateCreated,
          "amount": value.amount,
          "paye": true,
          "phoneNumber": result.data.phoneNumber
        }
        this.isLunched = false
        this.payStatut = true
        this.modalCtrl.dismiss(paymentResponse, 'success', 'pay_integrator_modal')
          .then(resp => {})
          .finally(()=> this.modalCtrl.dismiss())
      }
    )
  }
}
