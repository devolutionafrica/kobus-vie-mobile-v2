import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonApp, IonContent, IonText, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem, IonIcon, IonInput } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';

import { StoreService } from './../../providers/store.service';
import { AppConfig, appConfigStep } from 'src/app/core/entities/AppConfig';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthentificationService } from 'src/app/core/usercases/Authentification.Service';
import { AlertModal, alertIcon } from 'src/shared/tools/modal';
import { APP_STORAGE_KEY } from 'src/app/config/config';

@Component({
  selector: 'app-parrainage',
  templateUrl: './parrainage.page.html',
  styleUrls: ['./parrainage.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonApp,
    IonContent,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonIcon,
    IonInput,
    MatButtonModule
  ]
})
export class ParrainagePage implements OnInit {
  parrainForm: FormGroup;
  constructor(
    private authClientService: AuthentificationService,
    private spinner: NgxSpinnerService,
    private _configSpinner: SpinnerConfigService,
    private route: Router,
    private store: StoreService
  ) {}

  ngOnInit() {
    this.parrainForm = new FormGroup({
      codeApporteur: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern(/^[0-9]*$/),
      ]),
    });
  }

  onFinalyConfig(code?) {
    this.route.navigate(['/login']).then((resp) => {
      const configStep = new AppConfig(true, appConfigStep.COMPLETED).json();
      if(code)
      {
        console.log(code)
      }else{
        console.log(101)
        this.store.dispatch(APP_STORAGE_KEY.PARRAIN_KEY, 101)
      }
      this.store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, configStep);
    });
  }

  onAddParrain() {
    const codeApporteur = parseInt(this.parrainForm.value.codeApporteur);
    this.spinner.show();
    this._configSpinner.setMessage('Verification en cours');
    const authQueryBody = { codeApporteur: codeApporteur };
    this.authClientService.codeApporteurVerif(authQueryBody).then((res) => {
      this.spinner.hide();
      if (res == true) {
        this.store.dispatch(APP_STORAGE_KEY.PARRAIN_KEY, codeApporteur);
        console.log('code apporteur value :::> ', codeApporteur);
        this.onFinalyConfig(codeApporteur);
      }else{
        AlertModal.show('Code incorrect',"Le code apporteur saisi n'est pas correct. Merci de réessayer", alertIcon.error, false);
      }
    });
  }
}
