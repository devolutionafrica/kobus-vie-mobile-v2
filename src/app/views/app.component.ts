import { AuthentificationService } from 'src/app/core/usercases/Authentification.Service';
import { APP_STORAGE_KEY } from '../config/config';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModalController } from '@ionic/angular/standalone';
import { StoreService } from '../providers/store.service';
import { ListenerRouterService } from 'src/shared/services/listener.route.service';
import { NetworkListenerService } from 'src/shared/services/networkListener.service';
import { HttpModalErrorComponent } from '../components/http-modal-error/http-modal-error.component';
import { SessionService } from '../providers/session.service';
import { SpinnerConfigService } from 'src/shared/tools/spinner-config.service';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
//import { InitAppPage } from './init-app/init-app.page';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  providers: [NetworkListenerService],
  imports: [
    IonApp,
    IonRouterOutlet,
    //InitAppPage
  ]
})

export class AppComponent implements OnInit, OnDestroy {

  modalOpened: boolean;
  message: string

  
  

  constructor(
    private _store: StoreService,
    private _session: SessionService,
    private modalCtrl: ModalController,
    private _spinnerConfig: SpinnerConfigService,
    private authService: AuthentificationService,
    private networkService: NetworkListenerService,
    
    private listenerService: ListenerRouterService) {
      this.modalOpened = false;

      if (!_session.storeValue(APP_STORAGE_KEY.AUTH)) {
        this._session.dispatch(APP_STORAGE_KEY.AUTH, null);
      }

      if (!_store.storeValue(APP_STORAGE_KEY.CONFIG_STEP)) {
        this._store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, null);
      }
    }


  ngOnDestroy(): void {
    this.authService.disconnect()
  }

  async networkModale(){
    const modal = await this.modalCtrl.create({
      cssClass: 'network-modal-style',
      component: HttpModalErrorComponent,
      backdropDismiss: false,
      componentProps: {
        cb: this.setModalOpened
      }
    });
    return await modal.present().then(() => this.modalOpened = true);
  }

  setModalOpened = (value: boolean) => {
    this.modalOpened = value;
  }

  ngOnInit(): void {
    this.listenerService.connectListener();
    this.networkService.checkNetworkStatus();
    this._spinnerConfig.subjectMsg
      .subscribe(
        msg => this.message = msg as string
      )
    this.networkService.networkStatusBehaviorSubject
      .subscribe(
        network => {
          if (!network && !this.modalOpened) this.networkModale()
          if (network && !this.modalOpened) this.networkModale()
        }
      );
  }
}
