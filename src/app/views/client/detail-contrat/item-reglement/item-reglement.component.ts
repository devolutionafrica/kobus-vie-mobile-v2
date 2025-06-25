import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCol, IonRow } from '@ionic/angular/standalone';

@Component({
  selector: 'item-reglement',
  templateUrl: './item-reglement.component.html',
  styleUrls: ['./item-reglement.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonCol,
    IonRow
  ]
})
export class ItemReglementComponent implements OnInit {
  @Input() reglement: any;

  constructor() { }

  ngOnInit() {}
}
