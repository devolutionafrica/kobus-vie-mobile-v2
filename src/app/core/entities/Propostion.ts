import { IPropositionObjectContrat } from './../factory/PropositionObjectContratFactory';
import { IPropositionObjectSouscription } from './../factory/PropositionObjectSouscripteurFactory';
import { IPropositionObjectBeneficiare } from './../factory/PropositionObjectBeneficiaireFactory';
export class Proposition {

  private _dateCreated!:Date
  private _payStatus!: boolean

  constructor(
    private _compte: ICompte,
    private _codeApporteur:string,
    private _garantieSouscrite: IGarantieSouscriteProposition[],
    private _questionMedical: IQuestionnaireMedicalProposition,
    private _souscripteur:IPropositionObjectSouscription,
    private _assuresAssocies: IAssuresAssociesProposition[],
    private _beneficiaires:IPropositionObjectBeneficiare[],
    private _contrat:IPropositionObjectContrat,
    private _devise: string,
    private _paiement?: IPaiement){
      this._dateCreated = new Date()
      this._payStatus = false
    }


  toJson():IProposition{
      return {
        Compte: this._compte,
        CodeApporteur: this._codeApporteur,
        Souscripteur: this._souscripteur,
        AssuresAssocies: this._assuresAssocies,
        Beneficiaires: this._beneficiaires,
        GarantiesSupplementairesSouscrites: this._garantieSouscrite,
        QuestionnaireMedical: this._questionMedical,
        Contrat: this._contrat,
        Paiement: this._paiement,
        Devise: this._devise
      }
    }
}

export interface IProposition {
  Compte: ICompte,
  CodeApporteur: string,
  Souscripteur: IPropositionObjectSouscription,
  AssuresAssocies: IAssuresAssociesProposition[],
  Beneficiaires: IPropositionObjectBeneficiare[],
  GarantiesSupplementairesSouscrites: IGarantieSouscriteProposition[],
  QuestionnaireMedical: IQuestionnaireMedicalProposition,
  Contrat: IPropositionObjectContrat,
  Paiement?: IPaiement,
  Devise: string,
  DetailSimulation?: any,
  Observation?: {
    Message: string,
    DateCreation: Date,
    StatutPaiement: boolean,
    NumeroProposition: string,
    NumeroPolice: string,
    PropositionStatus: number,
  },
  PieceJoints?: any
  NomApporteur?: string
}

export interface ICompte {
  TypeCompte: string,
  NumeroCarte: string,
  Domiciliation: string,
  FinValidite: string,
  CodeBanque: string,
  CodeAgence: string,
  Racine: string,
  CleRib: string
}

export interface IPaiement{
  CompteDebit: string,
  DetailPayment: string ,
  PaimentProvider: string,
  ModeReglement: string,
  PaymentId: string,
  Montant: number
}

export interface IDateEffetPolice {
  DateEffet: string
}
export interface IDureeContrat {
  DureeContrat: number
}

export interface IGarantieSouscriteProposition {
  TypeGarantie: string,
  GarantieId: string,
  Montant: number,
  Periodicite: string,
  DureeGarantie: number
}

export interface IQuestionnaireMedicalProposition {

}
export interface IAssuresAssociesProposition {

}


