import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StoreService } from 'src/app/providers/store.service';
import { AppConfig } from '../entities/AppConfig';
import { AppConfigHandler } from './../handlers/AppConfigHandler';
import {SessionService} from "../../providers/session.service";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AppConfigService extends AppConfigHandler {

  constructor(store:StoreService, session:SessionService){
      super(session, store)
    }

  clean() {
      return this.cleanConfig()
    }

  save(configObj: AppConfig): Observable<AppConfig> {
      return this.saveConfig(configObj)
    }

  update(config: AppConfig): Observable<AppConfig> {
      return this.updateConfig(config)
    }

  load(): Observable<AppConfig> {
      return this.loadConfig()
    }
}
