import { APP_STORAGE_KEY } from './../../config/config';
import { Injectable } from "@angular/core";
import { PeriodiciteService } from "./Periodicite.Service";
import { ModeReglementService } from "./ModeReglement.Service";
import { StoreService } from "src/app/providers/store.service";
import { TypeDemandePrestationService } from "./TypeDemandePrestation.Service";
import { AppConfigHandler } from "../handlers/AppConfigHandler";
import { BehaviorSubject, Observable } from "rxjs";
import { AppConfig } from "../entities/AppConfig";
import { OperateurMobileService } from "./OperatorList.Service";
import { AgenceService } from './Agence.Service';
import { SessionService } from 'src/app/providers/session.service';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class AppInitConfigService extends AppConfigHandler{

  appConfig:any
  currentAppConfigSubject: BehaviorSubject<any>;
  constructor(
    private store: StoreService,
    private session: SessionService,
    private agenceService: AgenceService,
    private periodiciteService:PeriodiciteService,
    private modeReglementService:ModeReglementService,
    private mobilOperatorService: OperateurMobileService,
    private typeDemandePrestationService:TypeDemandePrestationService){
      super(session, store)
      this.appConfig = this.store.storeValue(APP_STORAGE_KEY.APP_CONFIG)
      this.currentAppConfigSubject = new BehaviorSubject<any>(this.appConfig)
    }

  async lunchInitProcess():Promise<any>{
    return await this.periodiciteService.getPeriodicites()
    .then(
      periodicites => {
        return this.modeReglementService.getModeReglement()
          .then(
            modeReglements => {
              return this.typeDemandePrestationService.getTypeDemandePrestations()
                .then(
                  typeDemandePrestation => {
                    return this.agenceService.getAgences()
                            .then(
                              agenceData => {
                                const appConfig = {
                                  agences: agenceData,
                                  operators: this.mobilOperatorService,
                                  modePayList: modeReglements,
                                  periodicityList: periodicites,
                                  typePrestationList: typeDemandePrestation
                                }
                                return appConfig
                              }
                            )
                     //return this.mobilOperatorService.getOperatorMobilList()
                     //.then(
                     //  operatorsRawData => {

                     //    }
                     //  )
                  }
                )
            }
          )
      }
    )
  }

  cleanSetpConfig() {
    return this.cleanConfig()
  }

  saveSetpConfig(configObj: AppConfig): Observable<AppConfig> {
      return this.saveConfig(configObj)
    }

  updateSetpConfig(config: AppConfig): Observable<AppConfig> {
      return this.updateConfig(config)
    }

  loadSetpConfig(): Observable<AppConfig> {
      return this.loadConfig()
    }

  setAppConfig(config:any){
      this.currentAppConfigSubject.next(config)
      this.store.dispatch('appConfig', config)
    }

  getAppConfig():any{
      return this.currentAppConfigSubject.value
    }
}
