import { Injectable } from "@angular/core";
import { EXTRANET_CLIENT_API } from "src/app/repository/EXTRANET_CLIENT_API";
import { Client } from "../entities/Client";
import { UtilisateurHandler } from "../handlers/UtilisateurHandler";



@Injectable(
  {
    providedIn: 'root'
  }
)
export class EditProfilClientService extends UtilisateurHandler{

  constructor(private extranetAPI: EXTRANET_CLIENT_API){
    super(extranetAPI)
  }

  loadUserProfil(queryBody: Object): Promise<Client> {
    return this.loadProfil(queryBody)
  }

  updateUserProfil(queryBody: Object): Promise<Client> {
    return this.updateProfil(queryBody)
  }



}
