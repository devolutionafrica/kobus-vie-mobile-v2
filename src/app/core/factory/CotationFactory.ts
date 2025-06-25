export class CotationFactory {
  public static build(jsonData: any): ICotation {
    return {
      statut: jsonData.Statut,
      produitId: parseInt(jsonData.ProduitId),
      dateEffet: jsonData.DateEffet,
      nomClient: jsonData.NomClient,
      telephone: jsonData.Telephone,
      numeroPolice: parseInt(jsonData.NumeroPolice),
      prenomClient: jsonData.PrenomClient,
      dateEmission: jsonData.DateEmission,
      natureProduit: jsonData.NatureProduit,
      propositionId: parseInt(jsonData.PropositionId),
      codeApporteur: jsonData.CodeApporteur,
      libelleProduit: jsonData.LibelleProduit,
      detailProposition: JSON.parse(jsonData.DetailProposition),
      descriptionRejet: jsonData.DescriptionRejet,
      numeroProposition: jsonData.NumeroProposition,
      numeroClientUnique: jsonData.NumeroClientUnique,
    }
  }
}

export interface ICotation {
  statut: string,
  produitId: number,
  dateEffet: string,
  nomClient: string,
  telephone: string,
  numeroPolice: number
  prenomClient: string,
  dateEmission: string,
  natureProduit: string,
  propositionId: number,
  codeApporteur: string,
  libelleProduit: string,
  detailProposition: any,
  descriptionRejet: string,
  numeroProposition: string,
  numeroClientUnique: string,
}
