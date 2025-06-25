import { Proposition } from './../entities/Propostion';
import { PropositionObjectCompteFactory } from './PropositionObjectCompteFactory';
import { PropositionObjectContratFactory } from './PropositionObjectContratFactory';
import { PropositionObjectPaiementFactory } from './PropositionObjectPaiementFactory';
import { PropositionObjectSouscripteurFactory } from './PropositionObjectSouscripteurFactory';
import { PropositionObjectAssuresAssociesFactory } from './PropositionObjectAssuresAssocierFactory';
import { PropositionObjectGarantieSouscriteFactory } from './PropositionObjectGarantieSouscriteFactory';
import { PropositionObjectQuestionnaireMedicalFactory } from './PropositionObjectQuestionnaireMedicalFactory';

export class PropositionFactory {
  public static build(jsonData:any): Proposition {
    return new Proposition(
      PropositionObjectCompteFactory.build(jsonData),
      jsonData.codeApporteur,
      PropositionObjectGarantieSouscriteFactory.build(jsonData),
      PropositionObjectQuestionnaireMedicalFactory.build(jsonData.questionnaireMedical) ,
      PropositionObjectSouscripteurFactory.build(jsonData),
      PropositionObjectAssuresAssociesFactory.build([]),
      jsonData.beneficiaire,
      PropositionObjectContratFactory.build(jsonData),
      jsonData.devise,
      PropositionObjectPaiementFactory.build(jsonData?.paiement || {}))
  }
}

export interface IPropositionResponse {
  dateEffet: Date,
  dateExpiration: Date,
  numeroPolice: number,
  identification: string,
  etatEncaissement: {
    numeroEncaiss: number,
    numeroAffectation: number,
    numeroQuittance: string,
    success: boolean
  }
}

export interface IDateEffet {
  DateEffet: string
}
export interface IDureeContrat {
  DureeContrat: number
}
export interface IDefaultCodeApporteur {
  NumeroApporteur: string
}

export interface ICapitaux {
  "Amount": number,
  "Libelle": string
}
