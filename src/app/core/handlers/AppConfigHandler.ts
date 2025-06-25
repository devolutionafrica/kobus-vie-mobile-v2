import { APP_STORAGE_KEY } from './../../config/config';
import { Injectable } from '@angular/core';
import { AppConfig, appConfigStep } from '../entities/AppConfig';
import { BehaviorSubject, from, Observable} from 'rxjs';
import { StoreService } from 'src/app/providers/store.service';
import { AppConfigFactory } from '../factory/AppConfigFactory';
import { SessionService } from 'src/app/providers/session.service';
@Injectable()
export abstract class AppConfigHandler {

  appConfigSubject: BehaviorSubject<AppConfig>;

  constructor(
    private _session: SessionService,
    private _store: StoreService){
        const appConfig = AppConfigFactory.build(this._store.storeValue('configApp')) as AppConfig;
        this.appConfigSubject = new BehaviorSubject<AppConfig>(appConfig);
      }

  cleanConfig() {
      this._store.dispatch('configApp', null);
      this.appConfigSubject.next(null);
    }

  saveConfig(configObj: AppConfig): Observable<AppConfig> {
      const data = configObj !== null ? configObj.json() : null;
      this.appConfigSubject.next(configObj);
      this._store.dispatch('configApp', data);
      return this.appConfigSubject;
    }

  updateConfig(config: AppConfig): Observable<AppConfig> {
      return this.saveConfig(config);
    }

  loadConfig(): Observable<AppConfig> {
      return this.appConfigSubject;
    }

  createStoreInitValue(){
    this._session.dispatch(APP_STORAGE_KEY.AUTH, null);
    this._store.dispatch(APP_STORAGE_KEY.APP_CONFIG, {});
    this._session.dispatch(APP_STORAGE_KEY.PROPOSITIONS, []);
    this._session.dispatch(APP_STORAGE_KEY.CONTRATS, []);
    this._store.dispatch(APP_STORAGE_KEY.FILIALE, null);
    this._store.dispatch(APP_STORAGE_KEY.CONFIG_STEP, {});
    this._store.dispatch(APP_STORAGE_KEY.LANGUAGE, null);
  }

}
