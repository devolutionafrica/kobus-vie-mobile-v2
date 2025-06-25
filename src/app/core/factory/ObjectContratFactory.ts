export class ObjectContratFactory {
  public static build(jsonData:any):IObjectContrat  {
    return {
      capital: jsonData.Capital,
      produit: jsonData.Produit,
      typePolice: jsonData.TypePolice,
      etatPolice: jsonData.EtatPolice,
      dureePolice: jsonData.DureePolice,
      numeroContrat: jsonData.NumeroContrat,
      dateFinPolice: jsonData.DateFinPolice,
      capitalAuTerme: jsonData.CapitalAuTerme,
      primePeriodique: jsonData.PrimePeriodique,
      dateDebutPolice: jsonData.DateDebutPolice,
      periodicieCotisation: jsonData.PeriodicieCotisation,
      rente : ObjectRenteFactory.build(jsonData)
    }
  }
}

export class ObjectRenteFactory {
  public static build(jsonData:any):IObjectRente {
    return {
      dureeRente: jsonData.DUREERENTE,
      montantRente: jsonData.MontantDeLaRente,
      periodiciteRente: jsonData.PeriodiciteRente
    }
  }
}

export interface IObjectContrat {
  capital: number,
  numeroContrat: number
  periodicieCotisation: string
  primePeriodique: number
  etatPolice: string
  capitalAuTerme: number
  dureePolice: string
  typePolice: string
  produit: string
  dateFinPolice: string
  dateDebutPolice: string
  rente : IObjectRente
}

export interface IObjectRente {
  dureeRente: number
  montantRente: number
  periodiciteRente: string
}
