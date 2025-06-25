import { PlatformService } from 'src/shared/services/platform.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  IonContent,
  IonImg,
  IonText,
  IonRadioGroup,
  IonItem,
  IonRadio,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { NgxSpinnerService } from 'ngx-spinner';

import { FilialeIcon } from 'src/app/config/filialeFlag';
import { StoreService } from 'src/app/providers/store.service';
import { IFilialeJsonFormat } from './../../core/entities/Filiale';
import { FilialeService } from './../../core/usercases/Filiale.Service';
import { AppConfig, appConfigStep } from 'src/app/core/entities/AppConfig';
import { AppInitConfigService } from 'src/app/core/usercases/AppInitConfig.Service';
import { FilialeSelectedService } from 'src/app/core/usercases/FilialeSelected.Service';
import { APP_STORAGE_KEY, FILIALE_CONFIG, USE_FILIALE_CONFIG } from './../../config/config';

@Component({
  selector: 'app-config-lang',
  templateUrl: './config-lang.page.html',
  styleUrls: ['./config-lang.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    IonContent,
    IonImg,
    IonText,
    IonRadioGroup,
    IonItem,
    IonRadio,
    IonButton,
    IonIcon
  ]
})

export class ConfigLangPage {

  private lastAppConfig: any;
  language: string;
  platformValue: string

  constructor(
    private route: Router,
    private platform: PlatformService,
    private store: StoreService,
    private spinner: NgxSpinnerService,
    private filialeService: FilialeService,
    private initAppService: AppInitConfigService,
    private filialeSelectedService: FilialeSelectedService,
    private translate: TranslateService 
    ) {
      this.language = this.translate.currentLang;
      if (!store.storeValue(APP_STORAGE_KEY.APP_CONFIG)) {
        this.initAppService.createStoreInitValue();
      }
      this.lastAppConfig = store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
      this.platformValue = this.platform.getPlatform()
    }

  changLanguage = (event) => {
    this.translate.setDefaultLang(event.detail.value);
    this.language = this.translate.currentLang;
  }

  ngOnInit(): void {
    !this.lastAppConfig.filiales && this.loadingProcess();
  }

  async loadingProcess() {
    this.spinner.show();
    this.filialeService.getFiliales()
      .then(
        (rawData: IFilialeJsonFormat[]) => {
          const filialeResponse = {filiales: rawData};
          USE_FILIALE_CONFIG && this.updateCustomConfig(rawData);
          this.store.dispatch(APP_STORAGE_KEY.APP_CONFIG, filialeResponse);
          const configStep = new AppConfig(false, appConfigStep.PROGRESS).json();
          this.store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, configStep);
          this.spinner.hide();
        }
      )
      .catch(error => {
        this.spinner.hide();
      });
  }

  ionViewDidLeave(){
    this.spinner.hide();
  }

  goToNextScreen(){
    if (USE_FILIALE_CONFIG) {this.route.navigate(['/init-app']); }
    else { this.route.navigate(['config-country']); }
  }

  updateCustomConfig(filialeData: IFilialeJsonFormat[]){
    filialeData.filter((filiale: IFilialeJsonFormat) => {
      if (filiale.codeFiliale === FILIALE_CONFIG.codeFiliale){
        const filialeItem = {
          filiale: filiale.libelle,
          fileDirPath: filiale.documentUrl,
          hostname: filiale.apiUrl,
          icon: FilialeIcon[filiale.codeFiliale],
          codeFiliale: filiale.codeFilialePaiement,
          devise: filiale.devise,
          souscriptionUrl: filiale.souscriptionUrl,
        };
        this.filialeSelectedService.setFiliale(filialeItem);
      }
    });
  }

}
