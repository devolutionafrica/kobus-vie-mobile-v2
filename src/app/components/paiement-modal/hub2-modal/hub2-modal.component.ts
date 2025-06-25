import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular/standalone';
import { APP_STORAGE_KEY } from 'src/app/config/config';
import { IHub2PayProcessQueryBody } from 'src/app/core/factory/Hub2PayProcessFactory';
import { StoreService } from 'src/app/providers/store.service';
import {AnimationOptions,LottieComponent} from 'ngx-lottie'
import {IonRow, IonItem, IonIcon, IonInput} from '@ionic/angular/standalone'
import {NgIf} from '@angular/common'

@Component({
  selector: 'app-hub2-modal',
  templateUrl: './hub2-modal.component.html',
  styleUrls: ['./hub2-modal.component.scss'],
  imports:[ReactiveFormsModule, LottieComponent,NgIf,IonRow, IonItem, IonIcon, IonInput]
})
export class Hub2ModalComponent implements OnInit {

  @Input() data: any
  @Input() callback: Function
  formCodeOTP: FormGroup
  isLunch: boolean = false
  isValid: boolean = false
  devise: string = ""
  hub2AnimationOptions : AnimationOptions = {
    path: 'https://assets2.lottiefiles.com/packages/lf20_fk1xhy4h.json',
    loop:  true,
    autoplay : true,
  };
  loadingAnimationOptions : AnimationOptions = {
    path: '../assets/lotties/lot_loading.json',
    loop:  true,
    autoplay : true,
  };
  validationAnimationOptions : AnimationOptions = {
    path: '../assets/lotties/lot_validate.json',
    loop:  true,
    autoplay : true,
  };

  constructor(
    private modalCtrl: ModalController,
    private store: StoreService) { }

  ngOnInit() {
    this.devise = this.store.storeValue(APP_STORAGE_KEY.FILIALE).devise
    this.formCodeOTP = new FormGroup({
      codeOTP: new FormControl("", [Validators.required,Validators.pattern(/^[0-9]*$/)])
    })

    this.formCodeOTP.valueChanges
      .subscribe(
        currentValue => {
          if(currentValue.codeOTP.length === 4) {
            this.isLunch = true
            const parms: IHub2PayProcessQueryBody = {
              IdentificationPayment: this.data.paymentId,
              ConfirmationCodeCustomer: currentValue.codeOTP,
            }
            this.callback(parms)
              .then(
                result => {
                  if(result.status === 'successful'){
                    this.isValid = true
                    this.modalCtrl.dismiss(result)
                  } else {
                    this.isValid = false
                    this.isLunch = false
                  }
                }
              )
          }
        }
      )
  }

}
