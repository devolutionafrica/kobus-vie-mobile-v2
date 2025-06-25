import { IContratClient } from "../entities/ContratClient"

export class BilanGraphFactory {

  public static build(contrats:IContratClient[]):IBilanGraph{
    let bilanGraph:IBilanGraph = {
      totalPrime: 0,
      totalImpaye: 0,
      totalCotisation: 0,
      numberImpaye: 0,
      numberContrats: contrats.length
    }
    for(let contrat of contrats){
      bilanGraph.totalPrime += contrat._observation.montantPrimeEmise
      bilanGraph.totalImpaye += contrat._observation.montantImpayes
      bilanGraph.numberImpaye += contrat._observation.nombreImpayees
      bilanGraph.totalCotisation += contrat._observation.montantTotalPaye
    }
    return bilanGraph
  }
}


export interface IBilanGraph {
  totalPrime:number,
  totalImpaye:number,
  totalCotisation:number,
  numberImpaye:number,
  numberContrats?:number,
}
