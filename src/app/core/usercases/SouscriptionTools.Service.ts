import { ICapitaux, IDateEffet } from './../factory/PropositionFactory';
import { IProduit, IDefaultApporteur } from './../entities/Produit';
import { Injectable, OnDestroy } from '@angular/core'
import { StoreService } from 'src/app/providers/store.service'
import { EXTRANET_SOUSCRIPTION_API } from 'src/app/repository/EXTRANET_SOUSCRIPTION_API'
import { SouscriptionToolsHandler } from './../handlers/SouscriptionToolsHandler'
import { IDureeContrat } from '../entities/Propostion';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class SouscriptionToolsService extends SouscriptionToolsHandler implements OnDestroy{

  constructor(
    store:StoreService,
    configAPI:EXTRANET_SOUSCRIPTION_API){
      super(store, configAPI)
    }

  ngOnDestroy(): void {
      console.log("component destroy #SouscriptionToolsService")
    }

  getListDateEffet():Promise<IDateEffet[]|boolean>{
      return this.listDateEffet()
    }

  loadProduits(): Promise<IProduit[]|boolean> {
      return this.listProduit()
    }

  searchProduitsByFamille(familleProduit: string): IProduit[] {
      return this.searchProduitsByNatureProduit(familleProduit)
    }

  searchProduitById(produitId: number): IProduit {
      return this.seachById(produitId)
    }

  getListDureeContrat(queryBody: any): Promise<IDureeContrat[]|boolean>{
      return this.listDureeContrat(queryBody)
    }

  apporteurParDefaut(): Promise<IDefaultApporteur> {
      return this.getApporteurBureauDirect()
    }

  getCapitauxParPeriodicite(queryBody: any): Promise<ICapitaux[]|boolean> {
      return this.listeCapitauxParPeriodicite(queryBody)
    }

  getCapitauxParGarantieFacultative(queryBody: any): Promise<ICapitaux[]|boolean> {
      return this.listeCapitauxParPeriodicite(queryBody)
    }
}
