import { Component, OnInit } from '@angular/core';
import { IonRow, IonCol, IonText,  IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'detail-reglement',
  templateUrl: './detail-reglement.component.html',
  styleUrls: ['./detail-reglement.component.scss'],
  imports: [IonIcon, IonRow, IonCol, IonText]
})
export class DetailReglementComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

}
