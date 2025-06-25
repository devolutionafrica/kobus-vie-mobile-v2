import { IGarantieSouscrite, IGarantieSouscriteFacultativeFactory } from "./GarantieSouscrite";

export class SimulationProduit {

  constructor(
    private _capitalAcquis:number,
    private _capitalEspere:number,
    private _garantiesSouscrites:IGarantieSouscrite[],
    private _garantiesFacultative:IGarantieSouscriteFacultativeFactory[],
    private _primeDeces:number,
    private _primePeriodique:number,
    private _primeSurvie:number,
    private _fraisAdhesion: number,
    private _coutPiece: number,
    private _premierePrime: number
  ){}

  toJson():ISimulationProduit {
    return {
      capitalAcquis: this._capitalAcquis,
      capitalEspere: this._capitalEspere,
      garantiesSouscrites: this._garantiesSouscrites,
      garantiesFacultative: this._garantiesFacultative,
      primeDeces: this._primeDeces,
      primePeriodique: this._primePeriodique,
      fraisAdhesion: this._fraisAdhesion,
      primeSurvie: this._primeSurvie,
      coutPiece: this._coutPiece,
      premierePrime: this._premierePrime,
    }
  }
}

export interface ISimulationProduit {
  capitalAcquis: number,
  capitalEspere: number,
  garantiesSouscrites: IGarantieSouscrite[],
  garantiesFacultative: IGarantieSouscriteFacultativeFactory[],
  primeDeces: number,
  primePeriodique: number,
  primeSurvie: number,
  fraisAdhesion: number,
  coutPiece: number,
  premierePrime: number
}
