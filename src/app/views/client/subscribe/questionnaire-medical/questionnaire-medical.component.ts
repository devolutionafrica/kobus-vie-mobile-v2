import { IQuestionnaireMedical } from './../../../../core/entities/Produit';
import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-questionnaire-medical',
  templateUrl: './questionnaire-medical.component.html',
  styleUrls: ['./questionnaire-medical.component.scss'],
})
export class QuestionnaireMedicalComponent implements OnInit {

  @Input() callback:Function;
  @Input() quizData:IQuestionnaireMedical[]
  isFinish = false;
  question = undefined;
  quizProgress = 0;
  quizEvolution = 0;
  responses = [];
  questionLength: number = 0

  constructor(
    private ctrlModal: ModalController) {}

  ngOnInit() {
    this.questionLength = this.quizData.length - 1;
    this.question = this.quizData[this.quizEvolution];
  }

  nextQuestion(resp: string){
    if (this.questionLength >= this.quizEvolution) {
      this.responses.push({
        QuestionnaireMedicalId: this.question.id,
        DescriptionMaladie: "",
        ASouffert: resp
      });
      this.quizEvolution++;
      this.quizProgress = this.quizEvolution / this.questionLength;
      if (this.quizData.length !== this.quizEvolution) { this.question = this.quizData[this.quizEvolution]; }
      else {
        this.ctrlModal.dismiss({
          id: 'medical-quiz-modal',
          dismissed: true
        }).then(resp => this.callback(this.responses));
      }
    }
  }

  previousQuestion(){
    if (this.quizEvolution > 0) {
      this.quizEvolution--;
      this.quizProgress =  this.quizEvolution / this.questionLength;
      this.question = this.quizData[this.quizEvolution];
    }
  }

}
