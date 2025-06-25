import { IQuestionnaireMedicalProposition } from "../entities/Propostion";

export class PropositionObjectQuestionnaireMedicalFactory {
  public static build(jsonData: any): IQuestionnaireMedicalProposition {
    return {
      ListeDocuments: [
        ...jsonData
      ]
    }
  }
}
