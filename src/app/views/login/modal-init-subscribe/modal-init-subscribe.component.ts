import { IGoogleAuthUserInfo } from './../../../core/factory/GoogleAuthUserInfoFactory';
import { GoogleAuthUserInfoService } from 'src/app/core/usercases/GoogleAuthUserInfo.Service';
import { SessionService } from './../../../providers/session.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormInitSubscribeProposition } from 'src/forms/forms';
import {  FormGroup, ReactiveFormsModule } from '@angular/forms';
import {MatIcon} from '@angular/material/icon' 
import { IonToolbar, IonInput,  IonIcon, IonContent,IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-modal-init-subscribe',
  templateUrl: './modal-init-subscribe.component.html',
  styleUrls: ['./modal-init-subscribe.component.scss'],
  providers: [GoogleAuthUserInfoService],
  imports :[ReactiveFormsModule,MatIcon,IonToolbar, IonInput, IonIcon, IonContent,IonItem]

})
export class ModalInitSubscribeComponent implements OnInit {

  initFormSubscribe:FormGroup
  googleAuthInfo: IGoogleAuthUserInfo = null

  constructor(
    private route:Router,
    private session:SessionService,
    private googleAuthService:GoogleAuthUserInfoService,
    private modalCtrl:ModalController) { }

  ngOnInit() {
    this.initFormSubscribe = new FormInitSubscribeProposition().buildForm()
  }

  public get nom () {return this.initFormSubscribe.get('nom')}
  public get prenom () {return this.initFormSubscribe.get('prenom')}
  public get contact () {return this.initFormSubscribe.get('contact')}
  public get adressEmail () {return this.initFormSubscribe.get('adressEmail')}

  onMoveProduct = ()=>{
    this.dismiss()
    const initSubscribe = {
      userData: this.initFormSubscribe.value,
      progress: 25
    }
    this.session.dispatch('initSubscribe', initSubscribe)
    this.route.navigate(['/products'])
  }

  dismiss() {
    this.modalCtrl.dismiss({
      id: 'init_subscribe_modal',
      'dismissed': true
    })
  }

  signIn(){
    this.dismiss()
    this.googleAuthService.googleSignIn()
      .then(
        (googleRespone:IGoogleAuthUserInfo|boolean) => {
          if(googleRespone){
            const userInfo = <IGoogleAuthUserInfo> googleRespone
            const initSubscribe = {
              userData: {
                adressEmail: userInfo.email,
                nom: userInfo.familyName,
                prenom : userInfo.givenName,
              },
              progress: 25
            }
            this.session.dispatch('initSubscribe', initSubscribe)
            this.route.navigate(['/products'])
          }
          else console.log('Google erreur detected :::> ', googleRespone)
        }
      )
  }

}
