import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGarantieFacultative } from 'src/app/core/entities/Produit';

@Component({
  selector: 'garantie-facultative-item',
  template: `
  <div class="garantie-item" style="margin-bottom: .6rem">
    <ion-row class="ion-align-items-center ion-justify-content-center">
      <ion-col size="2">
        <span>
          <ion-icon (click)="onPopGarantie()" color="danger" name="trash-outline" slot="end"></ion-icon>
        </span>
      </ion-col>
      <ion-col size="8" class="ion-no-padding">
        <ion-row class="ion-align-items-center ion-no-padding">
          <ion-col size="10" class="ion-no-padding">
            <span style="color: var(--ion-color-dark-shade); font-weight: 410; font-size: initial;" class="ion-no-padding">
              {{garantieInfo.libelle}}
            </span>
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center ion-no-padding">
          <ion-col size="10" class="ion-no-padding">
            Montant {{garantieInfo.montantSouscrit|number}} {{devise}}
          </ion-col>
          <ion-col size="2" class="ion-no-padding">
            <span>
              <ion-icon size="small" *ngIf="garantieInfo.version !== 1" color="success" slot="start" name="lock-open-outline"></ion-icon>
              <ion-icon size="small" *ngIf="garantieInfo.version === 1" color="danger" slot="start" name="lock-closed-outline"></ion-icon>
            </span>
          </ion-col>
        </ion-row>
      </ion-col>
      <ion-col size="2">
        <span (click)="openModalToEditGarantie()">
          <ion-icon size="small" color="dark" slot="start" name="pencil-outline"></ion-icon>
        </span>
      </ion-col>
    </ion-row>
  </div>`,
  styleUrls: ['./garantie-item.component.scss']
})
export class GarantieItemComponent implements OnInit {

  @Input() devise: string
  @Input() garantieInfo: IGarantieFacultative
  @Output() actionEditing = new EventEmitter();;
  @Output() actionPop = new EventEmitter<IGarantieFacultative>();

  isChecked: boolean;

  constructor(){}

  onPopGarantie(){
    this.actionPop.emit(this.garantieInfo)
  }

  openModalToEditGarantie(){
    this.actionEditing.emit()
  }

  ngOnInit(): void {console.log("garantie list data ", this.garantieInfo)}

}
