import { Injectable } from "@angular/core";
import { EXTRANET_SOUSCRIPTION_API } from "src/app/repository/EXTRANET_SOUSCRIPTION_API";
import { IGarantieFacultative } from "../entities/Produit";
import { GarantieFacultativeHandler } from "../handlers/GarantieFacultativeHandler";

@Injectable(
  {
    providedIn: 'root'
  }
)
export class GarantieFacultativeService extends GarantieFacultativeHandler {

  constructor(
    private apiService: EXTRANET_SOUSCRIPTION_API){
      super(apiService)
    }

  addGarantie(garantie: IGarantieFacultative): void {
      this.addGarantieFacultative(garantie)
    }

  removeGarantie(garantie: IGarantieFacultative): void {
      this.popGarantieFacultative(garantie)
    }

  updateGarantieFacultativeByListCapitaux(garanties:IGarantieFacultative[], detailProduit: any): Promise<IGarantieFacultative[]>{
    return this.updateGarantieByCapitaux(garanties, detailProduit)
  }

  cleanList(): void {
      this.cleanListGarantieFacultative()
    }
}
