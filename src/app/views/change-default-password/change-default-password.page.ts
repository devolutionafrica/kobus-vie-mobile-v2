import { PlatformService } from './../../../shared/services/platform.service';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonRow,
  IonCol,
  IonItem,
  IonIcon,
  IonInput
} from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { NgxSpinnerService } from 'ngx-spinner';

import { APP_STORAGE_KEY } from 'src/app/config/config';
import { FormUpdateUserPassword } from 'src/forms/forms';
import { StoreService } from 'src/app/providers/store.service';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { AuthentificationService } from 'src/app/core/usercases/Authentification.Service';
import { SessionService } from 'src/app/providers/session.service';
import { EditProfilClientService } from 'src/app/core/usercases/EditProfilClient.Service';

@Component({
  selector: 'app-change-default-password',
  templateUrl: './change-default-password.page.html',
  styleUrls: ['./change-default-password.page.scss'],
  providers: [AuthentificationService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonRow,
    IonCol,
    IonItem,
    IonIcon,
    IonInput,
    MatButtonModule,
    MatIconModule
  ]
})

export class ChangeDefaultPasswordPage implements OnInit {
  formInvalid: boolean;
  hostname: string;
  firstInputType: string
  secondInputType: string
  firstShowPassword: boolean
  secondShowPassword: boolean
  updateFormPassword: FormGroup
  platformValue: string

  constructor(
    private route: Router,
    private store: StoreService,
    private platform: PlatformService,
    private spinner: NgxSpinnerService,
    private authService: AuthentificationService,
    private profilService: EditProfilClientService,
    private _session: SessionService) {
      this.hostname = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG).hostname;
      this.platformValue = platform.getPlatform()
    }

  ionViewWillEnter(){
    if(this.updateFormPassword.valid && this.lastPassword.value === this.newPassword.value)
      this.formInvalid = false
    else this.formInvalid = true
  }

  ngOnInit() {
    this.formInvalid = false;
    this.firstShowPassword = false
    this.secondShowPassword = false
    this.firstInputType = 'password'
    this.secondInputType = 'password'
    this.updateFormPassword = new FormUpdateUserPassword().buildForm()

    this.newPassword.valueChanges
      .subscribe(
        value => {
          if(this.updateFormPassword.valid && this.lastPassword.value === value)
            this.formInvalid = false
          else this.formInvalid = true
        }
      )
  }

  public get contact(){ return this.updateFormPassword.get('contact'); }
  public get newPassword(){ return this.updateFormPassword.get('newPassword'); }
  public get emailAdress(){ return this.updateFormPassword.get('emailAdress'); }
  public get lastPassword(){ return this.updateFormPassword.get('lastPassword'); }

  firstInputToggleShow() {
    this.firstShowPassword = !this.firstShowPassword;
    this.firstInputType = this.firstShowPassword ? 'text': 'password'
  }

  secondInputToggleShow() {
    this.secondShowPassword = !this.secondShowPassword;
    this.secondInputType = this.secondShowPassword ? 'text': 'password'
  }

  updateAccountPassword(){
    this.spinner.show()
    const currentAuthUser = this._session.storeValue(APP_STORAGE_KEY.CURRENT_ACCES)
    console.log('currentAuthUser :::> ', currentAuthUser)
    const data = {
      "Login": currentAuthUser.username,
      "NouveauPassword": this.newPassword.value,
      "EMAIL": this.emailAdress.value,
      "Telephone": this.contact.value
    }
    this.authService.createNewPassword(data)
      .then(
        rawData => {
          if (rawData.Statut === 200){
            let authUser = this._session.storeValue(APP_STORAGE_KEY.AUTH)
            const profilQueryBody = {
              Filliale: authUser.codeFiliale,
              NumeroClient: authUser.clientNumber
            };
            this.profilService.loadUserProfil(profilQueryBody)
              .then(
                queryResponse => {
                  this.spinner.hide()
                  authUser.isFirstConnexion = false
                  const currentUser = queryResponse.toJson();
                  this._session.dispatch(APP_STORAGE_KEY.AUTH, authUser)
                  this._session.dispatch(APP_STORAGE_KEY.CURRENT_USER, currentUser)
                  AlertModal
                    .show("", "Bravo, votre mot de passe à bien été mise à jour", alertIcon.success)
                    .then(
                      resp => {
                        this._session.dispatch(APP_STORAGE_KEY.CURRENT_ACCES, {})
                        this.route.navigate(['/dashboard'])
                      }
                    )
                }
              )
          }
          else {
            this.spinner.hide()
            AlertModal
              .show("Erreur de mise à jour", rawData.Message, alertIcon.error)
          }
        }
      )
  }

}
