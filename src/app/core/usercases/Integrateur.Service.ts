import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';
import { IntegrateurHandler } from './../handlers/IntegrateurHandler';
import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/providers/store.service';
import { IIntegrateur } from '../factory/IntegrateurFactory';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class IntegrateurService extends IntegrateurHandler {

  constructor(
    private _store: StoreService,
    private _apiService: EXTRANET_CONFIG_API) {
    super(_store, _apiService)
  }

  getIntegrateurs(): Promise<IIntegrateur[]> {
    return this.loadIntegrators()
  }

  cleanOperatorList(){
      this.cleanStorageIntegrateur()
    }
}
