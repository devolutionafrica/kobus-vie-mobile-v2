import { IContrat, IImpaye, IQuittanceImpaye } from "src/app/models/contrat.model"
import { Tools } from "src/shared/tools/utils"

export class QuittanceObjectFactory {
  public static build(jsonData: any): IQuittance {
    return {
      numeroClient: jsonData.NUMERO_CLIENT,
      numeroPolice: jsonData.NUMERO_POLICE,
      numeroQuittance: jsonData.NUMERO_QUITTANCE,
      libelleImpaye: jsonData.LibelleImpaye,
      montantImpaye: jsonData.MONTANT_EMIS,
      dateDebutEffet: Tools.formatDate(jsonData.DATE_DEBUT_EFFET_POLICE, 'en') ,
      dateFinEffet: Tools.formatDate(jsonData.DATE_FIN_EFFET_POLICE, 'en'),
      etatQuittance: jsonData.ETAT_QUITTANCE
    }
  }
}

export interface IQuittance {
  numeroClient: number
  numeroPolice: number
  numeroQuittance: number
  libelleImpaye: string
  montantImpaye: number
  dateDebutEffet: Date
  dateFinEffet: Date
  etatQuittance: string
}

export class QuittanceImpayesBuilder{
  public static build(jsonObject: IContrat[]): IQuittanceImpaye {
    let incrAmount = 0
    let incrNumber = 0
    let newData:IImpaye[] = []
    const listImpayes = jsonObject.map( itemContrat => itemContrat.impayes )

    for(let values of listImpayes){
      incrNumber += values.count
      incrAmount += values.montantImpaye
      newData = [...values.data, ...newData]
    }

    return {
      data: newData,
      montantImpaye: incrAmount,
      count: incrNumber
    }
  }
}
