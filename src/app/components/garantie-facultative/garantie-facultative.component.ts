import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IGarantieFacultative } from 'src/app/core/entities/Produit';
import { ICapitaux } from 'src/app/core/factory/PropositionFactory';

import { IonList,  IonItem, IonImg,  IonGrid, IonRow, IonCol, IonText, IonInput, IonIcon, IonSelect, IonSelectOption} from '@ionic/angular/standalone';
import { NgIf, NgFor, DecimalPipe } from '@angular/common';

@Component({
  selector: 'garantie-facultative',
  templateUrl: './garantie-facultative.component.html',
  styleUrls: ['./garantie-facultative.component.scss'],
  imports: [NgIf,NgFor,  DecimalPipe, IonList,  IonItem, IonImg, IonIcon, IonGrid, IonRow, IonCol, IonText, IonInput, IonSelect, IonSelectOption]
})
export class GarantieFacultativeComponent implements OnInit, OnChanges {

  @Input() devise: string
  @Input() callbackResponse: ICapitaux[]
  @Input() garantieInfo: IGarantieFacultative
  @Output() actionAdd = new EventEmitter<IGarantieFacultative>();
  @Output() actionPop = new EventEmitter<IGarantieFacultative>();
  @Output() actionLoadGarantie = new EventEmitter<IGarantieFacultative>();

  currentGarantie: IGarantieFacultative
  montantSouscrit: number = 0
  isChecked:boolean = false
  slideValue:number = 0
  listCapitaux: ICapitaux[] = []

  constructor(
    private modalCtrl: ModalController) { }

  ngOnChanges(changes: SimpleChanges): void {
    const currentCapitaux = changes.callbackResponse.currentValue as ICapitaux[]
    this.listCapitaux = currentCapitaux
  }

  ngOnInit() {
    this.listCapitaux = []
    this.currentGarantie = this.garantieInfo
  }

  toggleCheck(){
    this.isChecked =! this.isChecked
    if(this.isChecked) this.actionLoadGarantie.emit(this.currentGarantie)
  }

  changeGarantie = ($event)=>{
      const currentAmount: number = $event.target.value as number
      this.currentGarantie.montantSouscrit = currentAmount
      this.actionAdd.emit(this.currentGarantie)
      this.isChecked = true
    }

  toggleModal = ()=> this.modalCtrl.dismiss()

  addGarantieFacultative(){
      this.actionAdd.emit(this.currentGarantie)
    }

  removeGarantieFacultative(){
      this.actionPop.emit(this.currentGarantie)
    }

}

