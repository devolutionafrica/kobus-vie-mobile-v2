import { GarantieSouscriteFactory } from '../factory/GarantieSouscriteFactory';
import { IGarantieSouscrite } from './../entities/GarantieSouscrite';
export abstract class GarantieSouscriteHandler {

  public static buildGarantieSouscriteList(rawData:any):IGarantieSouscrite[]{
    let garantiesSouscrites:IGarantieSouscrite[] = []
    if(rawData){
      for(let itemRawData of rawData){
          const garantieSouscrite = GarantieSouscriteFactory.build((itemRawData))
          garantiesSouscrites.push(garantieSouscrite.toJson())
        }
      }
      return garantiesSouscrites
    }
}
