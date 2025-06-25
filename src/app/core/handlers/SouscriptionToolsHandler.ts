import { BehaviorSubject } from 'rxjs';
import { ProduitFactory } from './../factory/ProduitFactory';
import { StoreService } from 'src/app/providers/store.service';
import { IDefaultApporteur, IProduit } from './../entities/Produit';
import { IExtranetSouscriptionAdaptor } from './../adaptors/IExtranetSouscriptionAdaptor';
import { ICapitaux, IDateEffet, IDefaultCodeApporteur, IDureeContrat } from '../factory/PropositionFactory';

export class SouscriptionToolsHandler {

  souscriptionSubject: BehaviorSubject<any>;
  private definitionProduits: any[] = []

  constructor(
    store:StoreService,
    private _apiInterface: IExtranetSouscriptionAdaptor){
      this.souscriptionSubject = new BehaviorSubject<any>(this.definitionProduits)
    }

  protected listProduit(): Promise<IProduit[]|boolean> {
    return this._apiInterface.definitionProduit()
      .then(
        response => {
          if (response.Status === 200) {
            this.definitionProduits = this.createProduitList(response)
            this.souscriptionSubject.next(this.definitionProduits)
            return this.definitionProduits
          }
          else { return false }
        }
      );
    }

  protected idApporteurBureauDirect(): Promise<IDefaultCodeApporteur|boolean> {
    return this._apiInterface.loadDefaultCodeApporteur()
      .then(
        response => {
          if (response.Success) {
            return response.apporteur
          }
          else { return false }
        }
      );
    }

  protected listDureeContrat(queruBody: any): Promise<IDureeContrat[]|boolean> {
    return this._apiInterface.loadDureeContrats(queruBody)
      .then(
        response => {
          if (response.Success) {
            return response.DureeContrats as IDureeContrat[]
          }
          else { return false }
        }
      );
    }

  protected async listDateEffet(): Promise<IDateEffet[]|boolean> {
    return await this._apiInterface.loadDateEffets()
      .then(
        response => {
          if (response.Success) {
            return response.ListeDateEffets as IDateEffet[]
          } else { return false }
        }
      );
    }

  protected async listeCapitauxParGarantieFacultative(queryBody: any): Promise<ICapitaux[]|boolean> {
    return await this._apiInterface.getGarantieFacultativeAmount(queryBody)
      .then(
        response => {
          if (response.Success) {
            return response.ListeDateEffets as ICapitaux[]
          } else { return false }
        }
      );
    }


  protected async listeCapitauxParPeriodicite(queryBody: any): Promise<ICapitaux[]|boolean> {
    return await this._apiInterface.getListCapitalByPeriodicite(queryBody)
      .then(
        response => {
          if (response.Success) {
            return response.Capitaux as ICapitaux[]
          } else { return false }
        }
      );
    }

  private createProduitList(jsonData: any): IProduit[] {
    const currentList: IProduit[] = [];
    for (const itemProduit of jsonData.DefinitionsProduits){
      const item: IProduit = ProduitFactory.build(itemProduit);
      currentList.push(item);
    }
    return currentList;
    }

  protected searchProduitsByNatureProduit(natureProduit: string): IProduit[]{
    return this.definitionProduits
      .filter(
        (itemProduit: IProduit) => itemProduit.natureProduit === natureProduit && itemProduit
      )
    }

  protected seachById(produitId: number): IProduit {
    return this.definitionProduits
      .filter(
        (itemProduit: IProduit) => itemProduit.produitId === produitId && itemProduit
      )[0]
    }

  protected getApporteurBureauDirect(): Promise<IDefaultApporteur> {
    return this._apiInterface.loadDefaultCodeApporteur()
      .then(numeroApporteur => numeroApporteur.apporteur)
  }
}
