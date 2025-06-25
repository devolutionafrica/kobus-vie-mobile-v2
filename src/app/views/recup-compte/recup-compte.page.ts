import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonText,
  IonItem,
  IonIcon,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { PlatformService } from './../../../shared/services/platform.service';
import { NgxSpinnerService } from 'ngx-spinner';

import { FormRecupAccount } from 'src/forms/forms';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { ResetAccountService } from '../../core/usercases/ResetAccount.Service';
import { Router } from '@angular/router';
import { DEFAULT_APP_ICON, FILIALE_CONFIG, USE_FILIALE_CONFIG } from 'src/app/config/config';

@Component({
  selector: 'app-recup-compte',
  templateUrl: './recup-compte.page.html',
  styleUrls: ['./recup-compte.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonText,
    IonItem,
    IonIcon,
    IonInput,
    IonButton,
    MatButtonModule,
    MatIconModule
  ]
})
export class RecupComptePage implements OnInit {
  recupForm:FormGroup
  appLogo: string
  platformValue: string

  constructor(
    private route:Router,
    private platform: PlatformService,
    private spinner:NgxSpinnerService,
    private apiRequest: ResetAccountService) {
      this.platformValue = this.platform.getPlatform()
     }

  initForm = ():void =>{
    if (USE_FILIALE_CONFIG) { this.appLogo = FILIALE_CONFIG.appIcon; }
    else { this.appLogo = DEFAULT_APP_ICON; }

    this.recupForm = new FormRecupAccount("", "").buildForm()
  }

  public get nuPolice(){ return this.recupForm.get('nuPolice') }
  public get adressMail(){ return this.recupForm.get('adressMail') }
  public get invalidForm(){ return this.recupForm.invalid }

  ngOnInit() {
    this.initForm()
  }

  ionViewWillEnter(): void {
    //this.translate.reloadSelected()
    //console.log(this.translate.getLanguage())
  }

  async sendRecupAccount(){
    const recupData = {
      "Email": this.recupForm.value.adressMail,
      "NumeroPolice": this.recupForm.value.nuPolice
    }
    this.spinner.show()
    this.apiRequest.resetAccount(recupData)
      .then(resp => {
        if(resp)
          AlertModal
            .show(
              "Récupération de compte",
              "Vérifier votre adresse email pour vous reconnecter", alertIcon.success)
            .then(resp => this.route.navigate(['login']))
        else
          AlertModal
            .show(
              "Récupération de compte",
              "Numéro de police ou adresse email incorrect", alertIcon.error)
      })
      .catch(error => {
        AlertModal
          .show(
            "Erreur Serveur",
            "Nous avons rencontré un problème lors de la récuperation de votre compte", alertIcon.error)
      })
      .finally(()=> this.spinner.hide())
    }




}
