import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { NetworkListenerService } from 'src/shared/services/networkListener.service';

//import { LanguageService } from 'src/shared/services/language/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { APP_STORAGE_KEY, DEFAULT_SPLASH_ICON } from 'src/app/config/config';
import { AppConfig, appConfigStep } from 'src/app/core/entities/AppConfig';
import { StoreService } from 'src/app/providers/store.service';
import { AppConfigFactory } from 'src/app/core/factory/AppConfigFactory';
import { FILIALE_CONFIG, USE_FILIALE_CONFIG } from './../../config/config';
import { AppInitConfigService } from 'src/app/core/usercases/AppInitConfig.Service';
import { FilialeService } from 'src/app/core/usercases/Filiale.Service';
import { FilialeSelectedService } from 'src/app/core/usercases/FilialeSelected.Service';
import { IFilialeJsonFormat } from 'src/app/core/entities/Filiale';
import { Filiale } from 'src/app/core/entities/Filiale';

import { FilialeIcon } from 'src/app/config/filialeFlag';
import { SessionService } from 'src/app/providers/session.service';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, TranslateModule],
  providers: [NetworkListenerService]
})
export class SplashPage implements OnInit {
  splashIcon = DEFAULT_SPLASH_ICON;
  private lastAppConfig: any;
  isLoading: boolean = false
  language: string;
  stepConfig: any
  currentDate:number

  constructor(
    private router: Router,
    private _store: StoreService,
    private _session: SessionService,
    private translate: TranslateService,
    private filialeService: FilialeService,
    private initAppService: AppInitConfigService,
    private networkService: NetworkListenerService,
    private filialeSelectedService: FilialeSelectedService
    
  ) {
      if (!_store.storeValue(APP_STORAGE_KEY.APP_CONFIG)) {
        this.initAppService.createStoreInitValue();
      }
      this.lastAppConfig = this._store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
      this.stepConfig = _store.storeValue(APP_STORAGE_KEY.CONFIG_STEP)
   }

  ngOnInit() {
    this.currentDate = new Date().getFullYear()
    this.networkService.checkNetworkStatus();
    this.networkService.networkStatusBehaviorSubject
      .subscribe(
        networkStatus => {
          if (networkStatus === true && this.isLoading === false){
            this.loadingProcess();
          }
        }
      );
    if (USE_FILIALE_CONFIG) {
      this.splashIcon = FILIALE_CONFIG.splashIcon;
    }
  }
  async loadingProcess() {

    if(this.stepConfig.step === appConfigStep.INIT || this.stepConfig.hasOwnProperty('step') === false)
      this.filialeService.getFiliales()
        .then(
          (rawData: IFilialeJsonFormat[]) => {
            console.log("Appel Page splash")
            const filialeResponse = {filiales: rawData};
            USE_FILIALE_CONFIG && this.updateCustomConfig(rawData);
            this._store.dispatch(APP_STORAGE_KEY.APP_CONFIG, filialeResponse);
            const configStep = new AppConfig(false, appConfigStep.INIT).json();
            this._store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, configStep);
            this.lastAppConfig = this._store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
            this.switchAppView(configStep.step);
          }
        )
        .catch(error => {
          console.log('Error lors chargement des données locale', error);
        })
      this.isLoading = true
  }
  async demoInit (){
    const filialeCameroun : Filiale = new Filiale(
     'api_url','FCFA', 'NSIA CAMEROUN', 237,'CM_VIE', 'documentUrl','code_paaiement', 'url_videp', 'url_souscrip'
    );
    const filialeResponse = {filiales: [filialeCameroun.toJson]};
    this._store.dispatch(APP_STORAGE_KEY.APP_CONFIG, filialeResponse);
    const configStep = new AppConfig(false, appConfigStep.INIT).json();
    this._store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, configStep);
    this.lastAppConfig = this._store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
    this.switchAppView(configStep.step);
    //this.isLoading = true
    this.switchAppView(configStep.step);
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

  ionViewWillEnter(){
    const configStep = AppConfigFactory.build(this._store.storeValue(APP_STORAGE_KEY.CONFIG_STEP));
    if (configStep !== null ) {
      this.switchAppView(configStep.json().step);
    } else { this.router.navigateByUrl('/splash'); }
  }

  switchAppView(step: string){
    switch (step) {
      case appConfigStep.COMPLETED:
        if (this._session.storeValue(APP_STORAGE_KEY.AUTH) !== null) {
          this.router.navigateByUrl('/home');
        }
        else { this.router.navigateByUrl('/login'); }
        break;
      case appConfigStep.PROGRESS:
        this.router.navigateByUrl('/init-app');
        break;
      case appConfigStep.INIT:
        this.router.navigateByUrl('/config-country');
        break;
      default:
        this.router.navigateByUrl('/splash');
        break;
    }
    this.isLoading = true;
  }
}
