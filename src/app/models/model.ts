/**
 *---------------------
 *  Fichier de model
 *---------------------
 * - Souscription
 * - Beneficiaire
 * - AutreBeneficiaire
 * - Prestation
 * - Simulation
 * - Contrat
 *---------------------
 */

export interface Souscription {
    idProd: string;
    dateEffet: Date;
    capitalSouscrire: number;
    dureeContrat: number;
    souscripteur: Utilisateur;
    beneficiaire?: Beneficiaire;

}

export interface Beneficiaire {
    typeBeneficier: string;
    tauxRepartition: number;
    autres?: AutreBeneficiaire;
}

export interface AutreBeneficiaire {
    nom: string;
    prenom: string;
    dateNaiss: Date;
    lieuNaiss: string;
    contact: string;
}

export interface Prestation {
}

export interface Simulation {
    Message: string;
    NouvelleRenteRecalculee: number;
    PoliceInterne: number;
    Prime24: number;
    PrimeRA15: number;
    RenteMinimale: number;
    SoldeResiduel: number;
    isEligible: true;
    montantBrutRachat: number;
    montantRachatMax: number;
    montantRachatNet: number;
    penalite: number;
    primePeriodique: number;
    valeurRachat: number;
}

export interface Utilisateur {
    id?: number;
    nom: string;
    prenom: string;
    sexe: string;
    dateNaiss: string;
    lieuNaiss: string;
    contacts: [];
    adressEmail: string;
}

export interface Contrat {
    nuPolice?: string;
    capitalSouscrire: number;
    dateEffetPolice: Date;
    dureeContrat: number;
    dateCloture: number;
    souscripteur: Utilisateur;
    prestation: Prestation[];
}

export interface OperateurMobil {
    $id: string;
    Pays: string;
    CodePays: string;
    IndicatifPays: string;
    CodeOperateur: string;
    operateur: string;
    NeedOTP: boolean;
    Message: string;
}

export interface AppConfig {
    hostname?: string;
    configStatus?: boolean;
    filiales?: Array<any>;
}

export enum FilialeIcon {
    BJ_VIE = 'ic_benin_96px.png',
    CG_VIE = 'ic_congo_96px.png',
    ML_VIE = 'ic_mali_96px.png',
    GN_VIE = 'ic_great_britain_96px.png',
    CM_VIE = 'ic_cameroon_96px.png',
    GB_VIE = 'ic_gabon_96px.png',
    SN_VIE = 'ic_great_britain_96px.png',
    TG_VIE = 'ic_togo_96px.png',
    CI_VIE = 'ic_ivory_coast_96px.png',
    GW_VIE = 'ic_guinea_bissau_96px.png'
}

export interface Filiale {
  filiale: string;
  icon: FilialeIcon;
  codeFiliale: string;
  devise: string;
  fileDirPath: string;
  hostname: string;
}

export enum PayApiKeyAccess {
  ML_VIE = 'Nsi@M@l!'
}

export interface IResult<T> {
  data: T
  msg: string
  status: boolean
}

export interface IBilanGraph {
  numberImpaye?:number,
  tauxEngagement?:number
  numberContrats?:number,
  numberCotation?:number,
  numberPrestation?:number
}

