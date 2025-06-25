export class PropositionObjectBeneficiaireFactory {

  public static build(beneficiareJsonList:any):IPropositionObjectBeneficiare[]{
    let propositionBeneficiaires:IPropositionObjectBeneficiare[] = []
    for(let beneficiare of beneficiareJsonList){
      const newFormatBeneficiare:IPropositionObjectBeneficiare = {
        TypeBeneficiaire: beneficiare.typeBeneficiaire ,
        Nom: beneficiare.nom,
        Prenoms: beneficiare.prenom,
        Repartition: beneficiare.repartition,
        Prefixe: 0,
        DateNaissance: beneficiare.dateNaissance,
        LieuDeNaissance: beneficiare.lieuDeNaissance,
        Telephone: beneficiare.telephone
        }
        propositionBeneficiaires.push(newFormatBeneficiare)
      }
    return  propositionBeneficiaires
    }
}

export interface IPropositionObjectBeneficiare {
  TypeBeneficiaire: string,
  Nom: string,
  Prenoms: string,
  Repartition: number,
  Prefixe: 0,
  DateNaissance: string,
  LieuDeNaissance: string,
  Telephone: string,
  Fullname?: string
}
