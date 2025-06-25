export class DemandePrestation {
  constructor(
    private _dateDem: string,
    private _demandePrestationType: string,
    private _idDemande: number,
    private _modeReglement: string,
    private _montant: number,
    private _numeroClient: string,
    private _police: string,
    private _policeDemande: number,
    private _produit: string,
    private _statutSinistre: string,
  ){}

  toJson():IDemandePrestation{
    return {
      dateDem: this._dateDem,
      demandePrestationType: this._demandePrestationType,
      idDemande: this._idDemande,
      modeReglement: this._modeReglement,
      montant: this._montant,
      numeroClient: this._numeroClient,
      police: this._police,
      policeDemande: this._policeDemande,
      produit: this._produit,
      statutSinistre: this._statutSinistre,
    }
  }
}


export interface IDemandePrestation {
  dateDem: string,
  demandePrestationType: string,
  idDemande: number,
  modeReglement: string,
  montant: number,
  numeroClient: string,
  police: string,
  policeDemande: number,
  produit: string,
  statutSinistre: string,
}
