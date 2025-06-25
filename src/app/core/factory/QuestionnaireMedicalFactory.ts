import { IQuestionnaireMedical } from "../entities/Produit"

export class QuestionnaireMedicalFactory {

  public static build(jsonData: any): IQuestionnaireMedical[] {
    let questions: IQuestionnaireMedical[] = []
    if (jsonData.length > 0)
      for(let quiz of jsonData ){
        const currentQuiz = {
          id: parseInt(quiz.Id),
          libelle: quiz.Libelle }
        questions.push(currentQuiz)
      }
    return questions
  }
}
