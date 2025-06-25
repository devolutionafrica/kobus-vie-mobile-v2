import {
  IAssureAssocies,
  IBeneficiairePolice,
  IClientUniqueContrats,
  IContrat,
  IDetailContrat,
  IGarantiePolice,
  IImpaye,
  IPrestation,
  IPrestationSinistre,
  IQuittanceImpaye,
  IReglement,
  IReglementPrestation,
  ITauxEngagement} from 'src/app/models/contrat.model';

import { IContratClient } from '../entities/ContratClient';
import { IPrime } from '../entities/Prime';
import { ObjectSinistreFactory } from './ObjectSinistreFactory';
import { ObjectSituationFactory } from './ObjectSituationFactory';
import { PrimeFactory } from './PrimeFactory';
export class ContratFullDetailFactory {

  public static build(jsonData: any, contratSelected: IContratClient): IContratClient {
    const listImpaye: IPrime[] = [];
    jsonData.Cotisation
      .find(
        itemPrime => {
          if (
            itemPrime.EtatQuittance === EtatQuittance.IMPAYE ||
            itemPrime.EtatQuittance === EtatQuittance.PENDING_FOR_PROCESS ) {
            console.log('EtatQuittance :::> ', itemPrime.EtatQuittance)
            listImpaye.push(PrimeFactory.build({...itemPrime, selected: false}));
          }
      }
    );
    const newContrat: IContratClient = {
      ...contratSelected,
      _sinistre: ObjectSinistreFactory.build(jsonData.Sinistre),
      _situation: ObjectSituationFactory.build(jsonData.Situation),
      _impayes: listImpaye
    };
    return newContrat;
  }
}


export class UniqueClientContratFactory {
  public static build(jsonData: any): IContrat {
  var currentData = jsonData.TermePoliceView
  currentData["MontantPrimePeriodique"] = jsonData.RecapitulatiEtatCotisationPolice.MontantPrimePeriodique
  currentData["CumuleDeCotisation"] = jsonData.RecapitulatiEtatCotisationPolice.CumuleDeCotisation

    return {
      impayes: UniqueClientContratImpayesFactory.build(jsonData.Impayes),
      garanties: UniqueClientContratGarantieFactory.build(jsonData.GarantieViews),
      detailContrat: UniqueClientContratDetailFactory.build(currentData),
      beneficiares: UniqueClientContratBeneficiaireFactory.build(jsonData.BeneficiairesViews),
      assureAssocie: UniqueClientContratAssureAssocieFactory.build(jsonData.AssureAssociesViews),
      prestationSinistres: UniqueClientContratPrestationFactory.build(jsonData.PrestationsSinistres),
    }
  }
}

export class UniqueClientContratsFactory {
  public static build(jsonData: any): IClientUniqueContrats {
    let contrats:IContrat[]=[]
    for (const item of jsonData.ListePolices)
      contrats.push(UniqueClientContratFactory.build(item))
    return {
      totalPrestationsCount: jsonData.TotalPrestationsCount,
      totalMontantImpayes: jsonData.TotalMontantImpayes,
      totalImpayeesCount: jsonData.TotalImpayeesCount,
      totalQuittanceImpayé:jsonData.NombreQuittanceImpaye,
      totalCount: jsonData.TotalCount,
      data: contrats
    }
  }
}

export class UniqueClientContratImpayesFactory {
  public static build(jsonData: any): IQuittanceImpaye {
    let quittanceImpayes: IImpaye[] = []
    for (const item of jsonData.ListeImpayePoliceViews) {
      const quittance:IImpaye = {
        numeroQuittance: item.NumeroQuittance,
        montantQuittance: item.MontantQuittance,
        debutPeriode: item.DebutPeriode,
        finPeriode: item.FinPeriode,
        etatQuittance: item.EtatQuittance,
        numeroPolice: item.NumeroPolice,
        libellePolice: item.LibellePolice
      }
      quittanceImpayes.push(quittance)
    }
    return {
      data: quittanceImpayes,
      montantImpaye: jsonData.TotalMontantImpayes,
      count: jsonData.TotalCount,
    }
  }
}

export class UniqueClientContratGarantieFactory {
  public static build(jsonData: any): IGarantiePolice[] {
    let garanties:IGarantiePolice[] = []
    for (const item of jsonData) {
      const currentData = {
        termePoliceGarantie: item.TermePoliceGarantieView as string
      }
      garanties.push(currentData)
    }
    return garanties
  }
}

export class UniqueClientContratDetailFactory {
  public static build(jsonData: any): IDetailContrat {
    return {
      montantPrimePeriodique: jsonData.MontantPrimePeriodique,
      cumuleDeCotisation:jsonData.CumuleDeCotisation,
      dateEffet: jsonData.DateEffet,
      uniteDuree: jsonData.UniteDuree,
      dureePolice: parseInt(jsonData.DureePolice),
      periodicite: jsonData.Periodicite,
      dateEcheance: jsonData.DateEcheance,
      numeroPolice: parseInt(jsonData.NumeroPolice),
      libellePolice: jsonData.LibellePolice,
      dateSignature: jsonData.DateSignature,
      fractionnement: jsonData.Fractionnement,
      numeroProposition: jsonData.NumeroProposition,
      dureeRente: jsonData.DureeRente,
      uniteDureeRente: jsonData.UniteDureeRente,
      naturePolice: jsonData.NaturePolice,
      statut: jsonData.Statut
    }
  }
}

export class UniqueClientContratBeneficiaireFactory {
  public static build(jsonData: any) : IBeneficiairePolice[] {
    let beneficiaires: IBeneficiairePolice[]= []
    for (const item of jsonData) {
      const currentData:IBeneficiairePolice = {
        termeBeneficiaire: item.TermeBeneficiaireView,
        beneficiaire: item.Beneficiaire,
        repartition: item.Repartition,
        typeRisque: item.TypeRisque
      }
      beneficiaires.push(currentData)
    }
    return beneficiaires
  }
}

export class UniqueClientContratAssureAssocieFactory {
  public static build(jsonData: any): IAssureAssocies[]{
    let assureAssocies:IAssureAssocies[] = []
    for (const item of jsonData) {
      const currentData = {
        nomAssocie: item.NomAssocie,
        lienParente: item.LienParente,
        prenomAssocie: item.PrenomAssocie,
        numeroAssocie: item.NumeroAssocie,
        dateNaissanceAssocie: item.DateNaissanceAssocie,
      }
      assureAssocies.push(currentData)
    }
    return assureAssocies
  }
}

export class UniqueClientContratPrestationFactory {
  public static build(jsonData: any): IPrestationSinistre {
    let sinistres:IPrestation[]=[]
    for (const item of jsonData.ListePrestationSinistre){
      const currentData = {
        numeroSinistre: item.NumeroSinistre,
        numeroPolice: item.NumeroPolice,
        cause: item.Cause,
        montantBrut: item.MontantBrut,
        demandeOperation: item.DemandeOperation,
        statut: item.Statut,
        dateOuverture: item.DateOuvertureSinistre,
        dateSurvenance: item.DateSurvenanceSinistre
      }
      sinistres.push(currentData)
    }
    return {
      data: sinistres,
      count: jsonData.TotalCount
    }
  }
}

export class UniqueClientPrestationReglememntFactory {
  public static build(jsonData: any): IReglementPrestation {
    let reglements:IReglement[] = []
    for (const itemReglement of jsonData.ListeReglementSinsitreViews) {
      const currentData:IReglement = {
        statut: itemReglement.Statut,
        assure: itemReglement.Assure,
        typeSinistre: itemReglement.TypeSinistre,
        typeDecompte: itemReglement.TypeDecompte,
        beneficiaire: itemReglement.Beneficiaire,
        etatReglement: itemReglement.EtatReglement,
        dateReglement: itemReglement.DateReglement,
        numeroTelephone: itemReglement.NumeroTelephone,
        numeroReglement: itemReglement.ModeReglementSouhaite,
        deviseReglement: itemReglement.DeviseReglement,
        personneSinistre: itemReglement.PersonneSinistre,
        montantReglement: itemReglement.MontantReglement,
        modeReglementSouhaite: itemReglement.ModeReglementSouhaite,
        numeroCompteReglement: itemReglement.NumeroCompteReglement,
      }
      reglements.push(currentData)
    }
    return {
      data: reglements,
      count: jsonData.TotalCount
    }
  }
}

export class TauxEngagementGlobalFactory {
  public static build(jsonData: any): ITauxEngagement {
    return {
      tauxToString : jsonData.TauxEngagementGlobalPercent,
      taux: jsonData.TauxEngagementGlobalValue
    }
  }
}

export class TauxEngagementByPoliceFactory {
  public static build(jsonData: any): ITauxEngagement {
    return {
      montantTotalEncaisse : jsonData.MontantTotalEncaisse,
      montantPrimePeriodique: jsonData.MontantPrimePeriodique,
      montantTotalImpaye: jsonData.MontantTotalImpaye,
      tauxToString : jsonData.TauxCotisation,
      taux: jsonData.TauxCotisationValeur
    }
  }
}

export enum EtatQuittance {
  SOLDEE= 'Soldée',
  IMPAYE= 'Quittance Emise non Soldée',
  REGULARISEE= 'Régularisée',
  PENDING_FOR_PROCESS = 'Attente retour banque'
}
