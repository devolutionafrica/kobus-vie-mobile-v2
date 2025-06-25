import { IObjectObservation } from './../factory/ObjectObservationFactory';
import { IObjectSouscripteur } from './../factory/ObjectSouscripteurFactory';
import { IObjectContrat } from './../factory/ObjectContratFactory';
import { IObjectSituation } from '../factory/ObjectSituationFactory';
import { IObjectSinistre } from '../factory/ObjectSinistreFactory';
import { IPrime } from './Prime';
export class ContratClient {

  private _sinistre: IObjectSinistre
  private _situation: IObjectSituation
  constructor(
    private _codeProduit: string,
    private _contrat: IObjectContrat,
    private _souscripteur: IObjectSouscripteur,
    private _observation: IObjectObservation,
  ){}

  public get situation (): IObjectSituation {
    return this._situation
  }

  public set situation (values: IObjectSituation) {
    this._situation = values
  }

  public get sinistre (): IObjectSinistre {
    return this._sinistre
  }

  public set sinistre (values :IObjectSinistre){
    this._sinistre = values
  }

  get nuPolice ():number { return this._contrat.numeroContrat }

  toJson():IContratClient{
    const contratFormatJson = {
      _codeProduit: this._codeProduit,
      _contrat: this._contrat,
      _souscripteur: this._souscripteur,
      _observation: this._observation,
      _situation: this._situation,
      _sinistre: this._sinistre
    }
    return contratFormatJson
  }
}

export interface IContratClient {
  _codeProduit: string,
  _contrat: IObjectContrat,
  _souscripteur: IObjectSouscripteur,
  _observation: IObjectObservation,
  _situation?: IObjectSituation,
  _sinistre?: IObjectSinistre,
  _impayes?: IPrime[],
  infoPolice?: {
    modeReglement: string,
    telephones: []
  }
}
