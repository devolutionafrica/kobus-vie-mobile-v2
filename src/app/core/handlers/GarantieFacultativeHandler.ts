import { BehaviorSubject } from "rxjs";
import { IGarantieFacultative } from "../entities/Produit";
import { IExtranetSouscriptionAdaptor } from "../adaptors/IExtranetSouscriptionAdaptor";

export class GarantieFacultativeHandler {

  garantieSelected: IGarantieFacultative[]
  garantieSelectedBehaviorSubject: BehaviorSubject<IGarantieFacultative[]>

  constructor(
      private subscribeAPI: IExtranetSouscriptionAdaptor) {
        this.garantieSelected = []
        console.log('garantie list value :::> ', this.garantieSelected)
        this.garantieSelectedBehaviorSubject = new BehaviorSubject<IGarantieFacultative[]>(this.garantieSelected)
    }


  protected loadGarantieAmount(queryBody: any): Promise<any> {
    return this.subscribeAPI.getGarantieFacultativeAmount(queryBody)
      .then(respnse => respnse)
      .catch(error => false)
    }


  protected async updateGarantieByCapitaux(listGarantie: IGarantieFacultative[], detailProduit: any):Promise<IGarantieFacultative[]>{
      let garanties: IGarantieFacultative[] = []
      for (const itemGarantie of listGarantie) {
        const params = {
          "ProduitId": detailProduit.idProduit,
          "Capital": detailProduit.montantSouscrit,
          "Fractionnment": detailProduit.fractionnement,
          "GarantieSupplementaireId": itemGarantie.identifiant
        }
        this.subscribeAPI.getGarantieFacultativeAmount(params)
          .then( listCapitaux => {
            garanties.push({...itemGarantie, listCapital: listCapitaux.Capitaux})
          })
      }
      return await garanties
    }


  protected addGarantieFacultative(garantie: IGarantieFacultative): void {
      const responseSearch = this.searchGarantieByList(garantie)
      console.log('Response search data :::> ', responseSearch)
      if(responseSearch.length > 0) this.updateGarantieFacultative(garantie)
      else {
        this.garantieSelected.push(garantie)
        this.garantieSelectedBehaviorSubject.next(this.garantieSelected)
      }
    }


  private updateGarantieFacultative(garantie: IGarantieFacultative): void {
    const newListGarantie = this.garantieSelected.filter(
      itemGarantie => {
          if(itemGarantie.identifiant === garantie.identifiant){
            itemGarantie.montantSouscrit = garantie.montantSouscrit
            return itemGarantie
          }
        }
      )
    console.log('new garantie list :::> ', newListGarantie)
    this.garantieSelected = newListGarantie
    this.garantieSelectedBehaviorSubject.next(newListGarantie)
    }


  protected popGarantieFacultative(garantie: IGarantieFacultative): void {
      console.log('pop operation :::> ', garantie)
      const newList = this.garantieSelected
          .filter(
            garantieItem => {
              garantieItem.identifiant !== garantie.identifiant && garantieItem
            }
          )
      this.garantieSelected = newList
      console.log('after pop operation :::> ', newList)
      this.garantieSelectedBehaviorSubject.next(newList)
    }


  protected cleanListGarantieFacultative(): void {
      this.garantieSelected = []
      this.garantieSelectedBehaviorSubject.next([])
    }


  private searchGarantieByList(garantie: IGarantieFacultative): IGarantieFacultative[] {
    return this.garantieSelected
      .filter(garantieItem => garantieItem.identifiant === garantie.identifiant && garantieItem)
    }
}
