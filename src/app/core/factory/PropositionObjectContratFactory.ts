export class PropositionObjectContratFactory {

  public static build(jsonData:any):IPropositionObjectContrat{
    console.log("contrat format data :::> ", jsonData)
    return {
      ProduitId: jsonData.ProduitId,
      Capital: jsonData.Capital,
      DateEffet: jsonData.DateEffet,
      DureeContrat: jsonData.DureeContrat,
      UniteDuree: 'ANNEE',
      Fractionnment: jsonData.Fractionnment,
      DureeRente: jsonData.DureeRente,
      CapitalAcquis: jsonData.simulateResponse.CapitalAcquis,
      CapitalEspere: jsonData.simulateResponse.CapitalEspere,
      }
    }
}

export interface IPropositionObjectContrat {
  ProduitId: number
  Capital: number
  DateEffet: string
  DureeContrat: number
  Fractionnment: string
  UniteDuree?: string
  DureeRente?: number
  CapitalAcquis?: number
  CapitalEspere?: number
  DateSignature?: string
}
