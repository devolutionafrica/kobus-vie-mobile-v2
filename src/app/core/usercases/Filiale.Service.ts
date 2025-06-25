import { EXTRANET_CONFIG_API } from './../../repository/EXTRANET_CONFIG_API';
import { Injectable } from "@angular/core";
import { StoreService } from 'src/app/providers/store.service';
import { FilialeHandler } from '../handlers/FilialeHandler';
import { IFilialeJsonFormat } from '../entities/Filiale';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class FilialeService extends FilialeHandler{

  constructor(
      store:StoreService,
      appConfigAPI:EXTRANET_CONFIG_API){
      super(store, appConfigAPI)
    }

  getFiliales():Promise<IFilialeJsonFormat[]>{
      return this.loadFiliale()
    }
}
