import { TranslateModule} from '@ngx-translate/core';

import { PlatformService } from 'src/shared/services/platform.service';
import { APP_STORAGE_KEY, DEFAULT_APP_ICON, FILIALE_CONFIG, USE_FILIALE_CONFIG } from './../../config/config';
import { ModalInitSubscribeComponent } from './modal-init-subscribe/modal-init-subscribe.component';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular/standalone';
import { FormControl, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription, zip } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Tools } from 'src/shared/tools/utils';
import { IFiliale } from 'src/app/core/entities/Filiale';
import { alertIcon, AlertModal } from 'src/shared/tools/modal';
import { StoreService } from 'src/app/providers/store.service';
import { PROPOSITION_UNAUTHENTICATED_NUMBER } from 'src/app/config/config';
import { ConfigModalComponent } from './config-modal/config-modal.component';
import { AppInitConfigService } from 'src/app/core/usercases/AppInitConfig.Service';
import { IAppConfig } from 'src/app/core/entities/AppConfig';
import { FilialeSelectedService } from 'src/app/core/usercases/FilialeSelected.Service';
import { AuthentificationService } from '../../core/usercases/Authentification.Service';
import { EditProfilClientService } from 'src/app/core/usercases/EditProfilClient.Service';
import { KobusClientUniqueService } from 'src/app/core/usercases/KobusClientUnique.Service';
import { IClientUniqueContrats } from 'src/app/models/contrat.model';
import { SessionService } from 'src/app/providers/session.service';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { IntegrateurService } from 'src/app/core/usercases/Integrateur.Service';
import { IIntegrateur } from 'src/app/core/factory/IntegrateurFactory';
import { WebviewIntegratorComponent } from 'src/app/components/webview-integrator/webview-integrator.component';
import { IonContent, IonItem, IonImg,  IonGrid, IonRow, IonCol, IonText, IonInput, IonIcon} from '@ionic/angular/standalone';
import { NgIf, NgClass } from '@angular/common';
import { FilialeIcon } from 'src/app/config/filialeFlag';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [TranslateModule, NgIf, NgClass, RouterLink,ReactiveFormsModule,
    IonContent,  IonItem, IonImg, IonIcon, IonGrid, IonRow, IonCol, IonText, IonInput]
})

export class LoginPage implements OnInit, OnDestroy {

  appLogo: string;
  passwordType: string;
  loginForm: FormGroup;
  showPassword: boolean;
  configStep: IAppConfig;
  filialeSelected: IFiliale;
  appConfigSubscribe: Subscription;
  platformValue: string

  constructor(
    private route: Router,
    private _store: StoreService,
    private _session: SessionService,
    private platform: PlatformService,
    private ctrlAlert: AlertController,
    private spinner: NgxSpinnerService,
    private appConfig: AppInitConfigService,
    private modalController: ModalController,
    private _configSpinner: SpinnerConfigService,
    private _integratorService: IntegrateurService,
    private filialeService: FilialeSelectedService,
    private editProfilService: EditProfilClientService,
    private authClientService: AuthentificationService,
    private _clientUniqueService: KobusClientUniqueService,
    private modalCtrl:ModalController
  ) {
    this.platformValue = this.platform.getPlatform()
    _configSpinner.setMessage("Connexion en cours")
  }

  initForm = (): void => {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)])
    });
  }

  showToggle() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  public get username(){ return this.loginForm.get('username'); }
  public get password(){ return this.loginForm.get('password'); }
  public get invalidForm(){ return this.loginForm.invalid; }


  ngOnInit() {
    //this.openWebviewIntegrator()
    this.filialeSelected = this._store.storeValue(APP_STORAGE_KEY.FILIALE);
    if (USE_FILIALE_CONFIG) { this.appLogo = FILIALE_CONFIG.appIcon; }
    else { this.appLogo = DEFAULT_APP_ICON; }

    this.initForm();

    this.filialeService.filialesSubject.subscribe(filiale => {
      this.filialeSelected = filiale;
      const appConfig = this._store.storeValue(APP_STORAGE_KEY.APP_CONFIG);
      appConfig.hostname = filiale.hostname;
      this._store.dispatch(APP_STORAGE_KEY.APP_CONFIG, appConfig);
    });
    this.filialeSelected = this.demoFiliale();
  }

  async openWebviewIntegrator() {
    const modal = await this.modalCtrl.create({
      id: 'pay_webview_modal',
      component: WebviewIntegratorComponent,
      cssClass: 'pay-subscribe-modal-style',
      componentProps: {
        payData: {},
        integrator: 'AfrikPay',
      },
    });

    await modal.present();
  }

  ionViewWillEnter(): void {
    this.password.reset()
    this.showPassword = false;
    this.passwordType = 'password';
    this._session.dispatch(APP_STORAGE_KEY.CONTRATS, null);
    this.filialeSelected = this.filialeService.get();
    this.appConfig.currentAppConfigSubject.value.filiales.find(item => {
      if (item.Libelle === this.filialeSelected.filiale){
        const newAppConfig = {...this.appConfig.getAppConfig(), hostname: item.ApiUrl};
        this.appConfig.updateConfig(newAppConfig);
      }
    });
  }

  openProposition(){
    this.route.navigate(['/propositions']);
  }

  onAuthentify = () => {
    this.loadingProcess();
  }

  async loadingProcess() {
    this.spinner.show();
    this._configSpinner.setMessage("Connexion en cours")
    const authQueryBody = {username: this.username.value, password: this.password.value};
    this.authClientService.auth(authQueryBody).then(
        authStatus => {
          if ( authStatus ) {
            const authUser = this.authClientService.authObject.toJson();
            const { codeFiliale, clientNumber } = authUser;
            const profilQueryBody = { Filliale: codeFiliale, NumeroClient: clientNumber };
            this._configSpinner.setMessage("Chargement de vos données personnelles")
            zip(
              this.editProfilService.loadUserProfil(profilQueryBody),
              this._clientUniqueService.getUniqueClientContrats(clientNumber),
              this._integratorService.getIntegrateurs()
            ).toPromise()
              .then(
                data => {
                  if(data[1].status) {
                    const currentUser = data[0].toJson();
                    const contrats = data[1].data as IClientUniqueContrats;
                    currentUser.dateCreation = Tools.getMinDateInContratArray(contrats.data).toDateString();
                    const appConfig = this._store.storeValue(APP_STORAGE_KEY.APP_CONFIG)

                    currentUser.dateCreation = Tools.getMinDateInContratArray(contrats.data).toDateString();
                    this._session.dispatch(APP_STORAGE_KEY.CURRENT_USER, currentUser);
                    this._session.dispatch(APP_STORAGE_KEY.CONTRATS, contrats);
                    this._session.dispatch(APP_STORAGE_KEY.AUTH, authUser);
                    appConfig.integrators = data[2] as IIntegrateur[]
                    this._store.dispatch(APP_STORAGE_KEY.APP_CONFIG, appConfig);
                    if (authUser.isFirstConnexion) {
                      AlertModal.show(
                        `Bienvenue ${currentUser.nom} ${currentUser.prenom}`,
                        'Nous vous prions de modifier votre mot de passe par defaut', alertIcon.warning, true, 'Modifier Maintenant')
                        .then(
                          respModal => {
                            this._session.dispatch(APP_STORAGE_KEY.CURRENT_ACCES, authQueryBody);
                            this.route.navigate(['/cgu-page']);
                          }
                        );

                    } else {
                      AlertModal.show(
                        `Bienvenue ${currentUser.nom} ${currentUser.prenom}`,
                        'Nous sommes heureux de vous revoir', alertIcon.success, true, 'Continuer');
                      this.route.navigate(['/dashboard']);
                    }
                  } else {
                    AlertModal.show(
                      'Erreur de interne',
                      'Nous avons rencontré un problème lors du chargement de vos données. Merci de réessayer', alertIcon.error, false);
                      this.route.navigate(['/login']);
                  }
                }
              )
              .catch(error => {
                this.spinner.hide()
                AlertModal.show(
                  'Erreur de Serveur',
                  'Nous avons rencontré un problème lors de la connexion avec le serveur', alertIcon.error, false);
                }
              )
              .finally(() => this.spinner.hide())
          } else {
            this.spinner.hide()
            AlertModal.show(
            'Erreur de connexion',
            'Nom d\'utilisateur ou mot de passe incorrect', alertIcon.error, false);
          }
        }
      )
      .catch(error => {
        this.spinner.hide()
        AlertModal.show(
          'Erreur de Serveur',
          'Nous avons rencontré un problème lors de la connexion avec le serveur', alertIcon.error, false);
      })
  }

  async presentConfigModal() {
    if (!USE_FILIALE_CONFIG) {
      const modal = await this.modalController.create({
        id: 'config_modal',
        component: ConfigModalComponent,
        cssClass: 'chang-filiale-modal-style'
      });
      return await modal.present();
    }
  }

  async presentInitSubscribeModal() {
    const propositions = this._session.storeValue(APP_STORAGE_KEY.PROPOSITIONS);
    if (propositions?.length === PROPOSITION_UNAUTHENTICATED_NUMBER ) {
      AlertModal
        .show('',
          'Vous ne pouvez plus créer de nouvelle proposition. Merci de vous connecter pour en créer plus',
          alertIcon.info
        );
    } else {
      const modal = await this.modalController.create({
        id: 'init_subscribe_modal',
        component: ModalInitSubscribeComponent,
        cssClass: 'init-subscribe-modal-style'
      });
      return await modal.present();
    }
  }

  ngOnDestroy(): void {this.ctrlAlert.dismiss(); }

  demoFiliale(): IFiliale {
    return {
      filiale: 'NSIA CAMEROON',
      icon: FilialeIcon.CM_VIE,
      codeFiliale: 'CM_VIE',
      devise: 'XAF',
      fileDirPath: 'assets/files/demo',
      hostname: 'https://demo.filiale.com',
      souscriptionUrl: 'https://demo.filiale.com/souscription',
    }
  }


}