import { EXTRANET_CONFIG_API } from './../../repository/EXTRANET_CONFIG_API';
import { Injectable } from "@angular/core";
import { PeriodiciteHandler } from './../handlers/PeriodiciteHandler';
import { StoreService } from 'src/app/providers/store.service';
import { Periodicite } from '../entities/Periodicite';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class PeriodiciteService extends PeriodiciteHandler{

  constructor(
      store:StoreService,
      appConfigAPI:EXTRANET_CONFIG_API){
      super(store, appConfigAPI)
    }

  getPeriodicites():Promise<Periodicite[]>{
      return this.loadPeriodicites()
    }
}
