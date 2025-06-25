import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core"
import { OperateurMobile } from '../entities/Operateur';
import { OperateurMobileHandler } from './../handlers/OperateurMobileHandler';
import { EXTRANET_CONFIG_API } from 'src/app/repository/EXTRANET_CONFIG_API';
import { StoreService } from 'src/app/providers/store.service';


@Injectable(
  {
    providedIn: 'root'
  }
)

export class OperateurMobileService extends OperateurMobileHandler{

  constructor(
    store:StoreService,
    extranetAPI: EXTRANET_CONFIG_API) {
    super(store, extranetAPI)
  }

  getOperatorMobilList(): Promise<OperateurMobile[]> {
      return this.loadMobilOperators()
    }

  cleanOperatorList(){
      this.cleanStorageOperator()
    }

}
