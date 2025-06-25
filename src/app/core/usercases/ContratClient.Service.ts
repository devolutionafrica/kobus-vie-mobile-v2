import { Injectable } from "@angular/core"
import { IContratClient } from "../entities/ContratClient"
import { ContratHandler } from "../handlers/ContratHandler"
import { EXTRANET_CLIENT_API } from "src/app/repository/EXTRANET_CLIENT_API"
import { SessionService } from "src/app/providers/session.service"


@Injectable(
  {
    providedIn: 'root'
  }
)
export class ContratClientService extends ContratHandler{

  constructor(
    session:SessionService,
    private extranetAPI:EXTRANET_CLIENT_API){
    super(session ,extranetAPI)
  }

  getContrats(queryBody:object):Promise<IContratClient[]|boolean>{
      return this.loadContrats(queryBody)
    }

  getContratDetail(queryBody:object):Promise<boolean|any>{
      return this.getContratFullDetail(queryBody)
    }

  saveQuittenceAfterPay(queryBody: object): Promise<any> {
      return this.saveQuittencePay(queryBody)
    }

  getInfoContrat(queryBody: object): Promise<any> {
      return this.modeReglementAndTelephone(queryBody)
    }

}
