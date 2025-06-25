import { Injectable } from "@angular/core";
import { ModeReglement } from '../entities/ModeReglement';
import { StoreService } from 'src/app/providers/store.service';
import { ModeReglementHandler } from './../handlers/ModeReglementHandler';
import { EXTRANET_CONFIG_API } from './../../repository/EXTRANET_CONFIG_API';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class ModeReglementService extends ModeReglementHandler{

  constructor(
      store:StoreService,
      appConfigAPI:EXTRANET_CONFIG_API){
      super(store, appConfigAPI)
    }

  getModeReglement():Promise<ModeReglement[]>{
      return this.loadModeReglement()
    }
}
