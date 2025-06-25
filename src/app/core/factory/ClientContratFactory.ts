import { ObjectObservationFactory } from './ObjectObservationFactory';
import { IContratClient,ContratClient } from './../entities/ContratClient';
import { ObjectContratFactory } from './ObjectContratFactory';
import { ObjectSouscripteurFactory } from './ObjectSouscripteurFactory';

export class ClientContratFactory {

  public static build(jsonData:any):IContratClient {
    let contrat:ContratClient = new ContratClient(
      jsonData.CodeProduit,
      ObjectContratFactory.build(jsonData),
      ObjectSouscripteurFactory.build(jsonData),
      ObjectObservationFactory.build(jsonData)
    )
    return contrat.toJson()
  }
}
