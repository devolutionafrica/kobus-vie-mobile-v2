export interface IContrat {
  garanties: IGarantiePolice[]
  impayes: IQuittanceImpaye
  detailContrat: IDetailContrat
  beneficiares: IBeneficiairePolice[]
  assureAssocie: IAssureAssocies[]
  prestationSinistres: IPrestationSinistre
  reglements?: IReglementPrestation
}

export interface IBeneficiairePolice {
  termeBeneficiaire: string,
  beneficiaire: string,
  repartition: string,
  typeRisque: string
}

export interface IAssureAssocies {
  nomAssocie: string,
  lienParente: string
  prenomAssocie: string,
  numeroAssocie: string,
  dateNaissanceAssocie: string,
}

export interface IGarantiePolice {
  termePoliceGarantie: string
}

export interface IPrestationSinistre {
  data: IPrestation[]
  count: number
}

export interface IDetailContrat {
  dateEffet: string,
  uniteDuree: string,
  dureePolice: number,
  montantPrimePeriodique:number,
  cumuleDeCotisation:number,
  periodicite: string
  dateEcheance: string,
  numeroPolice: number,
  libellePolice: string,
  dateSignature: string,
  fractionnement: string,
  numeroProposition: number,
  dureeRente: number|null,
  uniteDureeRente: string,
  naturePolice: string,
  statut: string
}

export interface IPrestation {
  numeroSinistre: string,
  numeroPolice: string,
  cause: string,
  montantBrut: number,
  demandeOperation: string,
  statut: string,
  dateOuverture: string,
  dateSurvenance: string
}

export interface IQuittanceImpaye {
  data: IImpaye[],
  montantImpaye: number,
  count: number,
}

export interface IImpaye {
  numeroQuittance: number,
  montantQuittance: number,
  debutPeriode: string,
  finPeriode: string,
  etatQuittance: string,
  numeroPolice: number,
  libellePolice: string,
  selected?: boolean,
}

export interface IClientUniqueContrats {
  totalPrestationsCount: number
  totalMontantImpayes: number
  totalImpayeesCount: number
  totalQuittanceImpayé: number
  totalCount: number
  data: IContrat[]
}

export interface IReglement {
  statut: string
  assure: string,
  typeSinistre: string,
  typeDecompte: string,
  beneficiaire: string,
  etatReglement: string,
  dateReglement: string,
  numeroTelephone: string,
  numeroReglement: string,
  deviseReglement: string,
  personneSinistre: string,
  montantReglement: number,
  modeReglementSouhaite: string,
  numeroCompteReglement: string,
}

export interface IReglementPrestation {
  data: IReglement[],
  count: number
}


export interface ITauxEngagement {
  montantTotalEncaisse? : number,
  montantPrimePeriodique?:number,
  montantTotalImpaye?: number,
  tauxToString : string,
  taux: number
}
