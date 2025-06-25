import { ICapitaux } from "../factory/PropositionFactory";

export class Produit {
  constructor(
    private _rules: IRule,
    private _produitId: number,
    private _libelle: string,
    private _nomImage: string,
    private _garanties: IGarantie[],
    private _garantieFacultatives: IGarantieFacultative[],
    private _natureProduit: string,
    private _libelleNatureProduit: string,
    private _dureeRentes: IDureeRente[],
    private _pieceJointes: IPieceJointe[],
    private _fractionnements: IFractionnement[],
    private _questionnaireMedicales: IQuestionnaireMedical[]
  ){}

  toJson(): IProduit {
    return {
      rules: this._rules,
      produitId: this._produitId,
      libelle: this._libelle,
      nomImage: this._nomImage,
      garanties: this._garanties,
      garantieFacultatives: this._garantieFacultatives,
      natureProduit: this._natureProduit,
      libelleNatureProduit: this._libelleNatureProduit,
      dureeRentes: this._dureeRentes,
      pieceJointes: this._pieceJointes,
      fractionnements: this._fractionnements,
      questionnaireMedicales: this._questionnaireMedicales
    }
  }
}

export interface IProduit {
  rules: IRule,
  produitId: number,
  libelle: string,
  nomImage: string,
  garanties: IGarantie[],
  garantieFacultatives: IGarantieFacultative[]
  natureProduit: string,
  libelleNatureProduit: string,
  dureeRentes: IDureeRente[],
  pieceJointes: IPieceJointe[],
  fractionnements: IFractionnement[],
  questionnaireMedicales: IQuestionnaireMedical[]
}

export interface IRule {
  ageMin: number,
  ageMax: number,
  dureeMin: number,
  dureeMax: number,
  montantMin: number,
  montantMax: number,
}

export interface IGarantieFacultative {
  code: string
  libelle: string
  capital: number
  version: number
  identifiant: string
  abreviation: string
  coeffGarantie: number
  plafondCapital: number,
  montantSouscrit?: number,
  listCapital?: ICapitaux[]
}

export interface IDureeRente {
  id: number,
  libelle: string
}

export interface IFractionnement {
  id: number,
  libelle: string
}

export interface IQuestionnaireMedical {
  id: number,
  libelle: string,
  response?: boolean
}

export interface IGarantie {
  id: number,
  libelle: string,
  montant: number,
  identifiant: string,
  abreviation: string,
  statut: string
}

export interface IPieceJointe {
  id: number,
  libelleDocx: string,
  natureProduit: string,
}


export interface IFamilleProduit {
  nature: string,
  libelle: string,
  data: IProduit[]
}

export interface IDefaultApporteur {
  NumeroApporteur: string
}
