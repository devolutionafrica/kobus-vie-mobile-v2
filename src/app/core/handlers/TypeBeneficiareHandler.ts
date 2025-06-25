import { TypeBeneficaireFactory } from './../factory/TypeBeneficiareFactory';
import { ITypeBeneficiare } from "../entities/TypeBeneficiare"

export abstract class TypeBeneficiareHandler {

  public static typeBeneficiares:ITypeBeneficiare[]

  public static buildTypeBeneficiareList(rawData:any):ITypeBeneficiare[]{
    if(rawData){
      for(let itemRawData of rawData){
          const typeBeneficiare = TypeBeneficaireFactory.build((itemRawData))
          this.typeBeneficiares.push(typeBeneficiare.toJson())
        }
      }
      return this.typeBeneficiares
    }

  public static getTypeBeneficiareById(idTypeBeneficiare:string):ITypeBeneficiare {
      return this.typeBeneficiares
        .filter(
          itemTypeBeneficiare => {
            if(itemTypeBeneficiare.id === idTypeBeneficiare)
              return itemTypeBeneficiare
          }
        )[0]
    }

}
