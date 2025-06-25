import { RuleObjectFactory } from './RuleObjectFactory';
import { IProduit, Produit } from '../entities/Produit';
import { GarantieFacultativeObjectFactory, GarantieObjectFactory } from './GarantieObjectFactory';
import { DureeRenteObjectFactory } from './DureeRenteObjectFactorie';
import { PieceJointeObjectFactory } from './PieceJointeObjectFactory';
import { QuestionnaireMedicalFactory } from './QuestionnaireMedicalFactory';
import { FractionnementObjectFactory } from './FractionnenementObjectFactory';

export class ProduitFactory {
  public static build(jsonData: any): IProduit {
    const produitObject = new Produit(
      RuleObjectFactory.build(jsonData.Rules),
      parseInt(jsonData.ProduitId),
      jsonData.Libelle,
      jsonData.ImageProduit,
      GarantieObjectFactory.build(jsonData.Garanties),
      GarantieFacultativeObjectFactory.build(jsonData.GarantiesSupplementaires),
      jsonData.NatureProduit,
      jsonData.LibelleNatureProduit,
      DureeRenteObjectFactory.build(jsonData.ListeDureeRente),
      PieceJointeObjectFactory.build(jsonData.PiecesJointes),
      FractionnementObjectFactory.build(jsonData.Fractionnements),
      QuestionnaireMedicalFactory.build(jsonData.QuestionnairesMedicales)
    )
    return produitObject.toJson()
  }
}
